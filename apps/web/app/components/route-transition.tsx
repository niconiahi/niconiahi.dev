import type { ReactElement } from "react"
import { Transition } from "@headlessui/react"
import { useTransition } from "@remix-run/react"

export default function RouteTransition(): ReactElement {
  const transition = useTransition()

  return (
    <Transition
      enter="transition-all duration-15000"
      enterFrom="w-0"
      enterTo="w-screen"
      show={transition.state === "loading"}
      role="progressbar"
    >
      <div className="fixed top-0 left-0 bg-gray-700 w-full h-2" />
    </Transition>
  )
}
