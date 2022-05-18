import { useTransition } from "@remix-run/react"
import type { ReactElement } from "react"

export default function RouteTransition(): ReactElement | null {
  const transition = useTransition()

  if (transition.state === "loading")
    return (
      <div className="fixed bottom-4 right-4 bg-gray-700 text-gray-50 p-2 rounded-md">
        <p>Loading route</p>
      </div>
    )

  return null
}
