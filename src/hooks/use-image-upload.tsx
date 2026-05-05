import imageCompression from 'browser-image-compression';
import { Dispatch, SetStateAction, useState } from "react";

/**
 * Hook para gerenciar o upload de imagens
 * @param previewUrl URL pública do arquivo
 * @param imageUrl URL privada a ser injetada no form
 * @returns [preview, image, loading, setImage, onUpload, onRemove]
 */
const useImageUpload = (
    previewUrl: string | null,
    imageUrl: string | null
): [string | null, string | null, boolean, Dispatch<SetStateAction<string | null>>, (file: File | null) => Promise<void>, () => void] => {
    const [preview, setPreview] = useState(previewUrl || null)
    const [image, setImage] = useState(imageUrl || null)
    const [loading, setLoading] = useState(false)

    const onUpload = async (file: File | null) => {
        if (!file) return;

        try {
            // Inicia processo de upload
            setLoading(true)

            // Compressão
            const compressedFile = await imageCompression(file, {
                maxSizeMB: 0.3,
                maxWidthOrHeight: 1024,
            })
            const previewUrl = URL.createObjectURL(compressedFile)
            setPreview(previewUrl)

            // Link de Upload no GCS
            const res = await fetch("/api/file/uploader", {
                method: "POST",
                body: JSON.stringify({
                    fileName: compressedFile.name,
                    mimeType: compressedFile.type,
                })
            });
            const { url, fileUrl } = await res.json();

            // Upload da imagem
            await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": compressedFile.type,
                },
                body: compressedFile,
            })

            // Define a URL no formulário
            setImage(fileUrl);

        } catch (error) {
            console.error('Erro ao fazer upload da imagem', error)
            throw new Error("Erro ao fazer upload da imagem")
        } finally {
            setLoading(false)
        }
    };
    const onRemove = async () => {
        // Remove do GCS
        await fetch(`/api/file/uploader?fileUrl=${encodeURI(image || "")}`, {
            method: "DELETE"
        })
        setPreview(null)
        setImage(null)
    };

    return [preview, image, loading, setImage, onUpload, onRemove]
}

export default useImageUpload