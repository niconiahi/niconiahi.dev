import { Block } from "@ethersproject/providers"

import { ChainId } from "~/types"
import { getProvider } from "~/helpers"

export async function getBlockNumber({
  chainId,
}: {
  chainId: ChainId
}): Promise<number> {
  const provider = getProvider({ chainId })
  const blockNumber = await provider.getBlockNumber()

  return blockNumber
}

export async function getBlock({
  chainId,
  blockNumber,
}: {
  chainId: ChainId
  blockNumber: number
}): Promise<Block> {
  const provider = getProvider({ chainId })
  const block = await provider.getBlock(blockNumber)

  return block
}
