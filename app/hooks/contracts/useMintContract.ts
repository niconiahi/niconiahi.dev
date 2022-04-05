import { JsonRpcSigner } from "@ethersproject/providers"
import { Mint__factory as mintFactory } from "../../../typechain-types"

import { Mint } from "~/types"
import { RIKEBY_CONTRACT_ADDRESSES } from "~/constants"

export function useMintContract({
  signer,
}: {
  signer?: JsonRpcSigner
}): Mint | undefined {
  const address = RIKEBY_CONTRACT_ADDRESSES.mint

  if (!signer) return undefined

  return mintFactory.connect(address, signer)
}
