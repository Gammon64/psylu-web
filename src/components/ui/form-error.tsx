type FormErrorProps = {
    errors?: string[];
}

const FormError = ({ errors }: FormErrorProps) => {
    if (!errors || errors.length === 0) return null

    return (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {errors.map((error, index) => (
                <p key={index}>{error}</p>
            ))}
        </div>
    )
}

export default FormError