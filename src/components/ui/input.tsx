import clsx from "clsx"
import { InputHTMLAttributes } from "react"
import { FieldError } from '@/types/error-properties';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: FieldError;
}
const Input = ({ className, error, ...props }: InputProps) => {
    return (
        <>
            <input
                {...props}
                className={clsx(
                    "p-3 rounded-lg border w-full outline-none transition",
                    "focus:ring-2 focus:ring-blue-500",
                    error ? "border-red-500" : "border-gray-300",
                    className
                )}
            />
            {error?.errors.map((err, index) => (
                <p key={index} className="text-red-500 text-sm">
                    {err}
                </p>
            ))}
        </>
    )
}

export default Input