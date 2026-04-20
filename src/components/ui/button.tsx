import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}
const Button = ({
  children,
  className,
  loading,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(
        "flex gap-4 w-full text-center items-center justify-center",
        "p-4 rounded-xl text-lg text-white transition cursor-pointer",
        "bg-blue-600 hover:bg-blue-700",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {loading ? "Salvando..." : children}
    </button>
  )
}

export default Button