import { useState, useEffect, ChangeEvent, ReactElement } from "react"
import { Form, json, useLoaderData } from "remix"
import type { LoaderFunction } from "remix"

import { big, getGasPrice, replace, request } from "~/helpers"
import { ChainId, Mint as MintContract } from "~/types"
import { AddressDisplay } from "~/components"
import {
  useXyz,
  useTransaction,
  useMintContract,
  useConnectMetamask,
} from "~/hooks"

type Token = {
  id: number
  owner: string
}

type Transfer = {
  id: string
  to: string
  from: string
  timestamp: string
}

type TransfersResponse = {
  transfers: Transfer[]
}

async function getTokens(): Promise<Token[]> {
  async function getTransfers(): Promise<Transfer[]> {
    const query = `
    query Transfers {
      transfers {
        id
        to
        from
        timestamp
      }
    }
    `

    return request<TransfersResponse>(query).then(({ transfers }) => transfers)
  }

  const transfers = await getTransfers()

  return transfers.reduce((prevTokens, { to, id }) => {
    const prevTokenIndex = prevTokens.findIndex(
      ({ id: prevId }) => prevId === Number(id),
    )
    const nextToken = { id: Number(id), owner: to }

    if (prevTokenIndex === -1) {
      return [...prevTokens, nextToken]
    } else {
      const nextTokens = replace(prevTokens, nextToken, prevTokenIndex)

      return nextTokens
    }
  }, [] as Token[])
}

type LoaderData = {
  tokens: Token[]
  gasPrice: number
}

export const loader: LoaderFunction = async () => {
  const gasPrice = await getGasPrice()
  const tokens = await getTokens()

  return json<LoaderData>({
    tokens,
    gasPrice,
  })
}

export default function MintProject(): ReactElement {
  const { gasPrice, tokens } = useLoaderData<LoaderData>()

  const mintContract = useMintContract()
  const connectMetamask = useConnectMetamask()
  const { chainId, blockNumber, account } = useXyz()

  const isRinkeby = chainId === ChainId.Rinkeby

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  if (!account || !blockNumber || !mintContract) {
    return (
      <div className="flex flex-col w-full items-center justify-center space-y-2 h-full">
        <p className="text-gray-500">You need to connect your Metamask</p>
        <button className="btn-primary" onClick={handleConnectMetamaskClick}>
          Connect wallet
        </button>
      </div>
    )
  }

  if (!isRinkeby) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>This section works on Rinkeby. Try changing to it from Metamask</p>
      </div>
    )
  }

  return (
    <>
      <AddressDisplay account={account} />
      <Mint
        account={account}
        gasPrice={gasPrice}
        mintContract={mintContract}
        tokens={tokens}
      />
    </>
  )
}

enum MintErrorType {
  Positive = "POSITIVE",
  Minted = "MINTED",
}

function Mint({
  tokens,
  account,
  gasPrice,
  mintContract,
}: {
  tokens: Token[]
  account: string
  gasPrice: number
  mintContract: MintContract
}) {
  const [error, setError] = useState<MintErrorType | undefined>(undefined)
  const [tokenId, setTokenId] = useState<number>(0)
  const [isMintable, setIsMintable] = useState<boolean>(false)

  const { send } = useTransaction()

  useEffect(() => {
    if (!tokenId) return

    async function canMint(tokenId: number) {
      const doesTokenExist = await mintContract.exists(tokenId)

      return !doesTokenExist
    }

    canMint(tokenId).then((canMint) => {
      if (canMint) {
        setIsMintable(true)
        setError(undefined)
      } else {
        setIsMintable(false)
      }
    })
  }, [mintContract, tokenId])

  async function mint(tokenId: number) {
    const value = big(tokenId).mul(1e12)
    const gasLimit = await mintContract.estimateGas.mint(account, tokenId, {
      value,
      gasPrice,
    })

    send(() =>
      mintContract.mint(account, tokenId, {
        value,
        gasLimit,
        gasPrice,
      }),
    )
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const tokenId = Number(event.target.value)

    if (!tokenId) {
      setTokenId(0)
    }

    setTokenId(tokenId)
  }

  function getErrorMessage(type: MintErrorType) {
    switch (type) {
      case MintErrorType.Minted: {
        return "Your number was already minted"
      }
      case MintErrorType.Positive: {
        return "Your number needs to be positive"
      }
    }
  }

  async function handleMint() {
    if (tokenId <= 0) {
      setError(MintErrorType.Positive)

      return
    }

    if (!isMintable) {
      setError(MintErrorType.Minted)

      return
    }

    mint(tokenId)
  }

  return (
    <>
      <Form className="flex flex-col self-end items-center space-y-4 p-4 bg-gray-200 rounded-md border-2 border-gray-900">
        <p className="flex flex-col">
          <label className="text-gray-500" htmlFor="number">
            Pick a number:
          </label>
          <input
            aria-errormessage="number_error"
            aria-invalid="false"
            aria-required="true"
            className="h-10 w-80 border-2 border-gray-900 p-2 bg-gray-50"
            id="number"
            type="number"
            value={tokenId}
            onChange={handleChange}
          />
          {error ? (
            <span className="text-red-400" id="number_error">
              {getErrorMessage(error)}
            </span>
          ) : null}
        </p>
        <button className="btn-primary w-full" onClick={handleMint}>
          Create
        </button>
      </Form>
      <section className="w-full">
        <h3 className="text-gray-500">NFTs</h3>
        <ol className="w-full">
          {tokens.map(({ id, owner }, index) => (
            <li key={`token_id_${id}_${index}`} className="">
              Token {id}, owned by: {owner}
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
