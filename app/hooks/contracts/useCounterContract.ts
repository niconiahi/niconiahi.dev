import { JsonRpcSigner } from "@ethersproject/providers"
import { Counter__factory as counterFactory } from "../../../typechain-types"

import { Counter } from "~/types"
import { RIKEBY_CONTRACT_ADDRESSES } from "~/constants"

export function useCounterContract({
  signer,
}: {
  signer?: JsonRpcSigner
}): Counter | undefined {
  const address = RIKEBY_CONTRACT_ADDRESSES.counter

  if (!signer) return undefined

  return counterFactory.connect(address, signer)
}
