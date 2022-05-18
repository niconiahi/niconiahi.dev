import type { ReactElement } from "react"
import { Transition } from "@headlessui/react"
import { useTransition } from "@remix-run/react"

export default function RouteTransition(): ReactElement {
  const transition = useTransition()

  return (
    <Transition
      enter="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={transition.state === "loading"}
    >
      <div className="fixed bottom-4 right-4 bg-gray-700 text-gray-50 p-2 rounded-md">
        <p>Loading route</p>
      </div>
    </Transition>
  )
}
