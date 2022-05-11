import { Transfers__factory as transfersFactory } from "@niconiahi/web3"

import { useXyz } from "~/hooks"
import type { Transfers } from "~/types"
import { MAINNET_CONTRACT_ADDRESSES } from "~/constants"

export function useTransfersContract(): Transfers | undefined {
  const { signer } = useXyz()
  const address = MAINNET_CONTRACT_ADDRESSES.transfers

  if (!signer) return undefined

  return transfersFactory.connect(address, signer)
}
