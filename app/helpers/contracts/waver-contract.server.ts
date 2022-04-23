import { Waver__factory as waverFactory } from "../../../typechain-types"
import { JsonRpcProvider } from "@ethersproject/providers"

import { Waver } from "~/types"
import { RIKEBY_CONTRACT_ADDRESSES } from "~/constants"

export function getWaverContract({
  provider,
}: {
  provider: JsonRpcProvider
}): Waver {
  const address = RIKEBY_CONTRACT_ADDRESSES.waver

  return waverFactory.connect(address, provider)
}
