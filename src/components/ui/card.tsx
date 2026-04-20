import clsx from 'clsx';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & {
    href?: string;
};

const CardBody = ({ className, children, ...props }: CardProps) => {
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

const Card = ({ className, children, href, ...props }: CardProps) => {
    if (href)
        return (
            <Link href={href}>
                <CardBody className={className} {...props}>{children}</CardBody>
            </Link>
        )
    else return <CardBody className={className} {...props}>{children}</CardBody>
}

export default Card