import clsx from 'clsx';
import { HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement>;

const Card = ({ className, children, ...props }: CardProps) => {
    return (
        <div
            {...props}
            className={clsx(
                "p-4 border rounded-xl bg-white dark:bg-gray-950 shadow-sm",
                className
            )}
        >
            {children}
        </div>
    )
}

export default Card