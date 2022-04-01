import { useEffect, useState } from "react"
import { Block, JsonRpcProvider } from "@ethersproject/providers"

import { ChainId } from "~/types"
import { useProvider } from "~/hooks"

export function useBlock({
  chainId,
  blockNumber,
}: {
  chainId?: ChainId
  blockNumber?: number
} = {}): Block | undefined {
  const [block, setBlock] = useState<Block | undefined>(undefined)

  const provider = useProvider({ chainId })

  useEffect(() => {
    if (!provider || !blockNumber) return

    async function getBlock(provider: JsonRpcProvider, blockNumber: number) {
      const block = await provider.getBlock(blockNumber)

      setBlock(block)
    }

    getBlock(provider, blockNumber)
  }, [blockNumber, provider])

  return block
}
