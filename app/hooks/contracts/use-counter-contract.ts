import { Counter__factory as counterFactory } from "../../../typechain-types"

import { useXyz } from "~/hooks"
import { Counter } from "~/types"
import { RIKEBY_CONTRACT_ADDRESSES } from "~/constants"

export function useCounterContract(): Counter | undefined {
  const { signer } = useXyz()
  const address = RIKEBY_CONTRACT_ADDRESSES.counter

  if (!signer) return undefined

  return counterFactory.connect(address, signer)
}
