import type { ReactElement } from "react"
import { useTransition } from "@remix-run/react"

export default function RouteTransition(): ReactElement | null {
  const transition = useTransition()

  if (transition.state === "loading")
    return (
      <div className="fixed top-0 left-0 bg-gray-700 h-1.5 route-transition w-full" />
    )

  return null
}
