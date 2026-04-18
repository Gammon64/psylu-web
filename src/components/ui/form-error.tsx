type FormErrorProps = {
    message?: any[] | string;
}

const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null

    return (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {message}
        </div>
    )
}

export default FormError