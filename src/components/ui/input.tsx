import clsx from "clsx"
import { InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean
}
const Input = ({ className, error, ...props }: InputProps) => {
    return (
        <input
            {...props}
            className={clsx(
                "p-3 rounded-lg border w-full outline-none transition",
                "focus:ring-2 focus:ring-blue-500",
                error ? "border-red-500" : "border-gray-300",
                className
            )}
        />
    )
}

export default Input