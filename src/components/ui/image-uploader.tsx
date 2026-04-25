import { FieldError } from "@/types/error-properties";
import { InputHTMLAttributes, useRef, useState } from "react";

type ImageUploaderProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: FieldError;
}

const ImageUploader = ({
    accept,
    label = 'Escolha uma imagem',
    error,
    ...props
}: ImageUploaderProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const handleFileChange = (file: File | null) => {
        if (!file) return

        const url = URL.createObjectURL(file)
        setPreview(url)
    }

    const handleRemove = () => {
        setPreview(null)
        if (inputRef.current) inputRef.current.value = ''
    }

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <div className="flex items-center gap-4">
                {/* Preview */}
                <div className="w-24 h-24 rounded-lg border flex items-center justify-center overflow-hidden bg-gray-50">
                    {preview ? (
                        <img
                            src={preview}
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
                <div className="flex flex-col gap-2">
                    <input
                        ref={inputRef}
                        type="file"
                        accept={accept}
                        className="hidden"
                        onChange={(e) =>
                            handleFileChange(e.target.files?.[0] || null)
                        }
                        {...props}
                    />

                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Escolher imagem
                    </button>

                    {preview && (
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="px-4 py-2 text-sm border rounded hover:bg-gray-100 transition"
                        >
                            Remover
                        </button>
                    )}
                </div>
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