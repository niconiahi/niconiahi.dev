import { ReactElement } from "react"

import { truncateString } from "~/helpers"

export default function AddressDisplay({
  account,
}: {
  account: string
}): ReactElement {
  return (
    <aside className="absolute top-4 right-4 border-2 p-2 border-gray-900 rounded-md flex space-x-2 items-center justify-center">
      <span className="w-2 h-2 bg-green-400 rounded outline outline-1 outline-gray-900" />
      <h1>{truncateString(account)}</h1>
    </aside>
  )
}
