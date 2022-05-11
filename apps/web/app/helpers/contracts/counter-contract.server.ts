import { Counter__factory as counterFactory } from "@niconiahi/web3"
import type { JsonRpcProvider } from "@ethersproject/providers"

import type { Counter } from "~/types"
import { RIKEBY_CONTRACT_ADDRESSES } from "~/constants"

export function getCounterContract({
  provider,
}: {
  provider: JsonRpcProvider
}): Counter {
  const address = RIKEBY_CONTRACT_ADDRESSES.counter

  return counterFactory.connect(address, provider)
}
