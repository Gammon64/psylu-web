import { FieldError } from '@/types/error-properties';
import clsx from "clsx";
import { OptionHTMLAttributes, SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    error?: FieldError;
}
const Select = ({ className, error, ...props }: SelectProps) => {
    return (
        <>
            <select
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

type OptionProps = OptionHTMLAttributes<HTMLOptionElement>;

const Option = ({ children, className, ...props }: OptionProps) => {
    return (
        <option {...props} className={clsx(
            "dark:bg-gray-900 dark:text-gray-100",
            className
        )}>{children}</option>
    )
}

export { Option };

export default Select