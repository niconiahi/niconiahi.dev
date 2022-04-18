import { Mint__factory as mintFactory } from "../../../typechain-types"
import { JsonRpcProvider } from "@ethersproject/providers"

import { Mint } from "~/types"
import { RIKEBY_CONTRACT_ADDRESSES } from "~/constants"

export function getMintContract({
  provider,
}: {
  provider: JsonRpcProvider
}): Mint {
  const address = RIKEBY_CONTRACT_ADDRESSES.mint

  return mintFactory.connect(address, provider)
}
