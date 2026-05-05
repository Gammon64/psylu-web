import useImageUpload from "@/hooks/use-image-upload";
import { FieldError } from "@/types/error-properties";
import clsx from "clsx";
import { InputHTMLAttributes, useRef } from "react";
import { toast } from "sonner";
import Button from "./button";

type ImageUploaderProps = InputHTMLAttributes<HTMLInputElement> & {
    previewUrl?: string | null;
    label?: string;
    error?: FieldError;
}

const ImageUploader = ({
    defaultValue,
    accept,
    previewUrl,
    label = 'Escolha uma imagem',
    error,
    ...props
}: ImageUploaderProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [preview, image, loading, setImage, onUpload, onRemove] = useImageUpload(previewUrl || null, String(defaultValue) || null);

    const handleFileChange = async (file: File | null) => {
        try {
            onUpload(file);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erro ao fazer upload da imagem");
        }
    }

    const handleRemove = () => {
        onRemove();
        if (inputRef.current) inputRef.current.value = ''
    }

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <div className="flex items-center gap-4">
                {/* Preview */}
                <div className="w-36 h-24 rounded-lg border flex items-center justify-center overflow-hidden bg-gray-50">
                    {preview ? (
                        <img
                            src={String(preview)}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-xs text-gray-400">
                            Sem imagem
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="grow flex flex-col gap-2">
                    {/* Lida com o arquivo no tipo File/Blob */}
                    <input
                        ref={inputRef}
                        type="file"
                        accept={accept}
                        className="hidden"
                        onChange={(e) =>
                            handleFileChange(e.target.files?.[0] || null)
                        }
                    />

                    <Button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {loading ? 'Processando...' : 'Escolher imagem'}
                    </Button>

                    <Button
                        type="button"
                        onClick={handleRemove}
                        className={clsx("px-4 py-2 text-sm border rounded hover:bg-gray-100 transition",
                            "bg-transparent text-gray-600 border-gray-400",
                            "disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200"
                        )}
                        disabled={!preview || loading}
                    >
                        Remover
                    </Button>
                </div>

                {/* Input manual */}
                <input
                    type="text"
                    placeholder="URL da imagem"
                    className={clsx(
                        "shrink p-3 rounded-lg border w-full outline-none transition",
                        "focus:ring-2 focus:ring-blue-500",
                        error ? "border-red-500" : "border-gray-300",
                    )}
                    value={image || ''}
                    onChange={(e) => setImage(e.target.value)}
                    {...props}
                />
            </div>
            {error?.errors.map((err, index) => (
                <p key={index} className="text-red-500 text-sm">
                    {err}
                </p>
            ))}
        </div>
    )
}

export default ImageUploader