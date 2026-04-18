import clsx from 'clsx'
import { HtmlHTMLAttributes } from 'react'

type H1Props = HtmlHTMLAttributes<HTMLHeadingElement>

const H1 = ({ className, ...props }: H1Props) => {
  return (
    <h1 {...props} className={clsx('text-3xl font-bold', className)}></h1>
  )
}

export default H1