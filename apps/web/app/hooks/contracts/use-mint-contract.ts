import { Mint__factory as mintFactory } from "@niconiahi/web3"

import { Mint } from "~/types"
import { useXyz } from "~/hooks"
import { RIKEBY_CONTRACT_ADDRESSES } from "~/constants"

export function useMintContract(): Mint | undefined {
  const { signer } = useXyz()
  const address = RIKEBY_CONTRACT_ADDRESSES.mint

  if (!signer) return undefined

  return mintFactory.connect(address, signer)
}
