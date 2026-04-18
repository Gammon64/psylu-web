import Link from "next/link"

type EmptyStateProps = {
    title: string
    description?: string
    actionLabel?: string
    actionHref?: string
}

const EmptyState = ({ title, description, actionLabel, actionHref }: EmptyStateProps) => {
    return (
        <div className="text-center py-10 border rounded-xl">
            <h2 className="text-lg font-semibold">{title}</h2>

            {description && (
                <p className="text-gray-500 mt-2">{description}</p>
            )}

            {actionLabel && actionHref && (
                <Link
                    href={actionHref}
                    className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    {actionLabel}
                </Link>
            )}
        </div>
    )
}

export default EmptyState