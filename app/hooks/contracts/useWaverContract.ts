import { JsonRpcSigner } from "@ethersproject/providers"
import { Waver__factory as waveFactory } from "../../../typechain-types"

import { Waver } from "~/types"
import { useMetamask } from "~/hooks"
import { RIKEBY_CONTRACT_ADDRESSES } from "~/constants"

export function useWaverContract({
  signer,
}: {
  signer?: JsonRpcSigner
}): Waver | undefined {
  const metamask = useMetamask()
  const address = RIKEBY_CONTRACT_ADDRESSES.waver

  if (!metamask || !signer) return undefined

  return waveFactory.connect(address, signer)
}
