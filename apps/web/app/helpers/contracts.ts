import { ERC20__factory as erc20Factory } from "@niconiahi/web3"

import type { ChainId, Erc20 } from "~/types"
import { getRpcProvider } from "~/helpers"

export function getErc20Contract({
  address,
  chainId,
}: {
  address: string
  chainId: ChainId
}): Erc20 {
  const provider = getRpcProvider({ chainId })

  return erc20Factory.connect(address, provider)
}
