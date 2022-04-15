import { useState, useEffect, ChangeEvent, ReactElement } from "react"
import { Form } from "remix"
import type { BigNumber } from "@ethersproject/bignumber"

import { big } from "~/helpers"
import { ChainId, Mint as MintContract } from "~/types"
import { AddressDisplay } from "~/components"
import {
  useXyz,
  useGasPrice,
  useTransaction,
  useMintContract,
  useConnectMetamask,
} from "~/hooks"

export default function MintProject(): ReactElement {
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
        blockNumber={blockNumber}
        mintContract={mintContract}
      />
    </>
  )
}

enum MintErrorType {
  Positive = "POSITIVE",
  Minted = "MINTED",
}

function Mint({
  account,
  blockNumber,
  mintContract,
}: {
  account: string
  blockNumber: number
  mintContract: MintContract
}) {
  const [tokenId, setTokenId] = useState<number>(0)
  const [error, setError] = useState<MintErrorType | undefined>(undefined)
  const [tokenIds, setTokenIds] = useState<BigNumber[]>([])
  const [isMintable, setIsMintable] = useState<boolean>(false)
  const [tokensCount, setTokensCount] = useState<number>(0)

  const gasPrice = useGasPrice()
  const { send } = useTransaction()

  useEffect(() => {
    async function getTokensCount(blockNumber: number) {
      const bigTokensCount = await mintContract.balanceOf(account, {
        blockTag: blockNumber,
      })
      const tokensCount = bigTokensCount.toNumber()

      setTokensCount(tokensCount)
    }

    getTokensCount(blockNumber)
  }, [blockNumber, mintContract, account])

  useEffect(() => {
    if (tokensCount < 1) return

    async function getTokenIds(tokensCount: number) {
      const tokenIdsPromises = Array.from({ length: tokensCount }, (_, index) =>
        mintContract.tokenOfOwnerByIndex(account, index, {
          blockTag: blockNumber,
        }),
      )
      const tokenIds = await Promise.all(tokenIdsPromises)

      setTokenIds(tokenIds)
    }

    getTokenIds(tokensCount)
  }, [blockNumber, mintContract, account, tokensCount])

  useEffect(() => {
    if (!tokenId) return

    async function canMint(tokenId: number) {
      const doesTokenExist = await mintContract.exists(tokenId)

      return !doesTokenExist
    }

    async function checkIsMintable(tokenId: number) {
      const isMintable = await canMint(tokenId)

      setIsMintable(isMintable)
    }

    checkIsMintable(tokenId)
  }, [mintContract, tokenId])

  useEffect(() => {
    if (!mintContract) return

    function handleTransferOff(mintContract: MintContract) {
      mintContract.off("Transfer", () => {
        console.warn(`Unsubscribed from "Transfer" Mint contract's event`)
      })
    }

    function handleTransferOn(mintContract: MintContract) {
      mintContract.on("Transfer", (_, __, tokenId) => {
        setTokenIds((prevTokenIds) => [...prevTokenIds, tokenId])
      })
    }

    handleTransferOn(mintContract)

    return () => {
      handleTransferOff(mintContract)
    }
  }, [mintContract])

  async function mint(tokenId: number) {
    if (!gasPrice) {
      console.warn('You need to know the "gasPrice" to execute this method')

      return
    }

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
          {tokenIds.map((tokenId, index) => (
            <li key={`token_id_${tokenId.toNumber()}_${index}`} className="">
              {tokenId.toNumber()}
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
