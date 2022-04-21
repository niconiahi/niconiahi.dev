import { ReactElement, ReactNode } from "react"
import clsx from "clsx"

type Props =
  | {
      children?: ReactNode
      className?: string
    }
  | JSX.IntrinsicElements["button"]

function IconButton({
  children,
  className: classNameProp,
  ...buttonProps
}: Props): ReactElement {
  const className = getClassName(classNameProp)

  return (
    <button className={className} {...buttonProps}>
      {children}
    </button>
  )
}

export default IconButton

function getClassName(className?: string) {
  return clsx(
    "p-2 hover:bg-gray-200 rounded transition duration-200 ease-in-out focus:outline-none focus:ring-2 text-black dark:text-white",
    className,
  )
}
