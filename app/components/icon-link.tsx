import type { ReactElement, ReactNode } from "react"
import clsx from "clsx"
import type { LinkProps } from "@remix-run/react"
import { Link } from "@remix-run/react"

function IconLink({
  children,
  isExternal = false,
  className: classNameProp,
  ...linkProps
}: {
  isExternal?: boolean
  children?: ReactNode
  className?: string
} & LinkProps): ReactElement {
  if (isExternal) {
    if (typeof linkProps.to !== "string")
      throw new Error("\"to\" must be a string")

    return (
      <a
        className={composeClassName(classNameProp)}
        rel="norefereer noopener"
        target="_blank"
        href={linkProps.to}
        {...linkProps}
      >
        {children}
      </a>
    )
  }

  return (
    <Link className={composeClassName(classNameProp)} {...linkProps}>
      {children}
    </Link>
  )
}

export default IconLink

function composeClassName(className?: string) {
  return clsx(
    "p-2 rounded transition text-gray-500 hover:bg-gray-200 hover:cursor-pointer",
    className,
  )
}
