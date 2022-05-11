import { Waver__factory as waveFactory } from "@niconiahi/web3"

import type { Waver } from "~/types"
import { useXyz } from "~/hooks"
import { RIKEBY_CONTRACT_ADDRESSES } from "~/constants"

export function useWaverContract(): Waver | undefined {
  const { signer } = useXyz()
  const address = RIKEBY_CONTRACT_ADDRESSES.waver

  if (!signer) return undefined

  return waveFactory.connect(address, signer)
}
