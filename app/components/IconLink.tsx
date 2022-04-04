import { ReactElement, ReactNode } from "react"
import clsx from "clsx"

type Props = {
  label: string
  isExternal?: boolean
  children?: ReactNode
  className?: string
} & JSX.IntrinsicElements["a"]

function IconLink({
  label,
  children,
  isExternal = false,
  className: classNameProp,
  ...aProps
}: Props): ReactElement {
  const className = getClassName(classNameProp)
  const referrer = isExternal
    ? { rel: "norefereer noopener", target: "_blank" }
    : {}

  return (
    <a className={className} {...aProps} {...referrer}>
      {children}
      <span className="sr-only">{label}</span>
    </a>
  )
}

export default IconLink

function getClassName(className?: string) {
  return clsx(
    "p-2 rounded transition text-gray-500 hover:bg-gray-700 hover:text-gray-100 dark:text-gray-500 dark:hover:text-gray-100",
    className,
  )
}
