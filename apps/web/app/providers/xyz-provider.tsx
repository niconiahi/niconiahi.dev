import type EventEmitter from "events"
import type { ReactNode } from "react"
import { useState, useEffect, useContext, createContext } from "react"
import type {
  Block,
  JsonRpcSigner,
  JsonRpcProvider,
} from "@ethersproject/providers"
import { Web3Provider } from "@ethersproject/providers"

import type { ChainId } from "~/types"
import { getRpcProvider } from "~/helpers"

export enum XyzNextValueType {
  Account = "ACCOUNT",
}

type XyzNextValue = {
  type: XyzNextValueType
  value: string
}

type XyzContextValues = {
  set: (nextValue: XyzNextValue) => void
  block?: Block
  signer?: JsonRpcSigner
  chainId?: ChainId
  account?: string
  provider?: Provider
  blockNumber?: number
}

enum ProviderType {
  Rpc = "RPC",
  Metamask = "METAMASK",
}

type Provider =
  | {
      type: ProviderType.Metamask
      provider: Web3Provider
    }
  | {
      type: ProviderType.Rpc
      provider: JsonRpcProvider
    }

// @ts-expect-error initial values are set with all "useState"
const XyzContext = createContext<XyzContextValues>({})

export function XyzProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [block, setBlock] = useState<Block | undefined>(undefined)
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined)
  const [chainId, setChainId] = useState<ChainId | undefined>(undefined)
  const [account, setAccount] = useState<string | undefined>(undefined)
  const [provider, setProvider] = useState<Provider | undefined>(undefined)
  const [blockNumber, setBlockNumber] = useState<number | undefined>(undefined)

  // Set Metamask if window available
  useEffect(() => {
    if (!window || provider?.type === ProviderType.Metamask) return

    setProvider({
      provider: new Web3Provider((window as any).ethereum),
      type: ProviderType.Metamask,
    })
  }, [provider])

  // Set an RPC if window is not available
  useEffect(() => {
    if (window || provider) return

    setProvider({
      provider: getRpcProvider({ chainId }),
      type: ProviderType.Rpc,
    })
  }, [chainId, provider])

  // Get initial accounts
  useEffect(() => {
    if (!provider) return

    async function getAccount({ provider }: Provider) {
      const accounts = await provider.send("eth_accounts", [])

      setAccount(accounts[0])
    }

    getAccount(provider)
  }, [provider])

  // Get initial chain id
  useEffect(() => {
    if (!provider) return

    async function getChainId({ provider }: Provider) {
      const hexChainId = await provider.send("eth_chainId", [])
      const chainId = hexToNumber(hexChainId)

      setChainId(chainId)
    }

    getChainId(provider)
  }, [provider])

  // Get block number and pool for new ones
  useEffect(() => {
    if (!provider) return

    const blockIntervalId = setInterval(() => getBlockNumber(provider), 5000)

    async function getBlockNumber({ provider }: Provider) {
      const blockNumber = await provider.getBlockNumber()

      setBlockNumber(blockNumber)
    }

    getBlockNumber(provider)

    return () => {
      clearInterval(blockIntervalId)
    }
  }, [provider])

  // Get block
  useEffect(() => {
    if (!provider || !blockNumber) return

    async function getBlock({ provider }: Provider, blockNumber: number) {
      const block = await provider.getBlock(blockNumber)

      setBlock(block)
    }

    getBlock(provider, blockNumber)
  }, [blockNumber, provider])

  // Get signer
  useEffect(() => {
    if (!provider) return

    function getSigner({ provider }: Provider) {
      setSigner(provider.getSigner())
    }

    getSigner(provider)
  }, [provider])

  // Listen for changes on accounts
  useEffect(() => {
    if (!window) return

    const ethereum = getEthereum()

    ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        const [account] = accounts

        setAccount(account)
      } else {
        setAccount(undefined)
      }
    })

    return () => {
      ethereum.removeListener("accountsChanged", () => {
        console.log('stop listening to "accountsChanged" event')
      })
    }
  }, [])

  // Listen for changes on chain
  useEffect(() => {
    if (!window) return

    const ethereum = getEthereum()

    ethereum.on("chainChanged", (hexChainId: string) => {
      const chainId = hexToNumber(hexChainId)

      setChainId(chainId)
    })

    return () => {
      ethereum.removeListener("chainChanged", () => {
        console.log('stop listening to "chanChanged" event')
      })
    }
  }, [])

  function set(nextValue: XyzNextValue) {
    switch (nextValue.type) {
      case XyzNextValueType.Account: {
        setAccount(nextValue.value)
        break
      }
    }
  }

  return (
    <XyzContext.Provider
      value={{ provider, account, chainId, blockNumber, block, signer, set }}
    >
      {children}
    </XyzContext.Provider>
  )
}

export function useXyz(): XyzContextValues {
  const web3Context = useContext(XyzContext)

  if (!web3Context) {
    throw new Error("You forgot to use your useWeb3hook within a Web3Provider")
  }

  return web3Context
}

function hexToNumber(hexChainId: string): number {
  return Number(hexChainId.slice(2))
}

function getEthereum(): EventEmitter {
  return (window as any).ethereum as EventEmitter
}
