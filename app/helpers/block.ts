import { Block } from "@ethersproject/providers"

import { ChainId } from "~/types"
import { getRpcProvider } from "~/helpers"

export async function getBlockNumber({
  chainId,
}: {
  chainId: ChainId
}): Promise<number> {
  const provider = getRpcProvider({ chainId })
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
  const provider = getRpcProvider({ chainId })
  const block = await provider.getBlock(blockNumber)

  return block
}
