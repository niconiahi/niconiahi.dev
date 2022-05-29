import type {
  Network,
  BaseProvider,
  TransactionResponse,
} from "@ethersproject/providers"
import { Formatter } from "@ethersproject/providers"

// testing
import { DELAY } from "@niconiahi/testing"

// web3
export enum ChainId {
  Mainnet = 1,
  Rinkeby = 4,
  Localhost = 539,
}

export type BaseProviderMock = {
  blockNumber: number
  chainReference: ChainId
  transactionResponse: TransactionResponse
}

export const getBaseProvider = ({
  blockNumber,
  chainReference,
  transactionResponse,
}: BaseProviderMock): BaseProvider => {
  const sendTransaction = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signedTransaction: string | Promise<string>,
  ): Promise<TransactionResponse> => {
    // TODO: assert something with "signedTransaction" (???)
    //       what is this parameter?

    return new Promise((resolve) => {
      setTimeout(() => resolve(transactionResponse), DELAY)
    })
  }

  const getNetwork = (): Promise<Network> => {
    return new Promise((resolve) => {
      const networks: Record<ChainId, Network> = {
        [ChainId.Mainnet]: {
          chainId: 1,
          name: "Homestead",
        },
        [ChainId.Rinkeby]: {
          chainId: 4,
          name: "Rinkeby",
        },
        [ChainId.Localhost]: {
          chainId: 539,
          name: "Localhost",
        },
      }

      const network = networks[chainReference]

      setTimeout(() => resolve(network), DELAY)
    })
  }

  const getBlockNumber = (): Promise<number> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(blockNumber), DELAY)
    })
  }

  // this is where the value it's being get
  // https://github.com/ethers-io/ethers.js/blob/master/packages/providers/src.ts/base-provider.ts#L833
  const formatter = new Formatter()

  const baseProvider = {
    formatter,
    getNetwork,
    getBlockNumber,
    sendTransaction,
  }

  return baseProvider as unknown as BaseProvider
}
