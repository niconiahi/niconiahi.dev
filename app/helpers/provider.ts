import { JsonRpcProvider } from "@ethersproject/providers"

import { ChainId } from "~/types"

export function getRpcProvider({
  chainId,
}: {
  chainId?: ChainId
}): JsonRpcProvider {
  switch (chainId) {
    case ChainId.Mainnet: {
      return new JsonRpcProvider(
        "https://eth-mainnet.alchemyapi.io/v2/a5n7e0kB6LJg5nDUx2cFqEYeDoa8aeqP",
        chainId,
      )
    }
    case ChainId.Rinkeby: {
      return new JsonRpcProvider(
        "https://eth-rinkeby.alchemyapi.io/v2/DTrh_uPMx4itUkUWVvdvp3u4HmZxEXJE",
        chainId,
      )
    }
    case ChainId.Localhost: {
      return new JsonRpcProvider()
    }
    default: {
      return new JsonRpcProvider(
        "https://eth-mainnet.alchemyapi.io/v2/a5n7e0kB6LJg5nDUx2cFqEYeDoa8aeqP",
        chainId,
      )
    }
  }
}
