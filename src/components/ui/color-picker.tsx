import { FieldError } from "@/types/error-properties";
import { InputHTMLAttributes, useState } from "react";

type ColorPickerProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: FieldError;
}

const ColorPicker = ({
    label = 'Escolha uma cor',
    error,
    ...props
}: ColorPickerProps) => {
    const [color, setColor] = useState('#3b82f6')

    const handleChange = (newColor: string) => {
        setColor(newColor)
    }

    return (
        <div className="flex flex-col gap-2 w-fit">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <div className="flex items-center gap-3">
                {/* Input nativo */}
                <input
                    type="color"
                    value={color}
                    onChange={(e) => handleChange(e.target.value)}
                    className="w-10 h-10 p-0 border rounded cursor-pointer"
                />

                {/* Input texto HEX */}
                <input
                    type="text"
                    value={color}
                    onChange={(e) => handleChange(e.target.value)}
                    className="px-3 py-2 border rounded text-sm w-28"
                    {...props}
                />

                {/* Preview */}
                <div
                    className="w-10 h-10 rounded border"
                    style={{ backgroundColor: color }}
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

export default ColorPicker