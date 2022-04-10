import { useState, useEffect, ChangeEvent, ReactElement } from "react"
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
      <div className="flex flex-col w-full items-center justify-end space-y-2">
        <p className="text-gray-500">You need to connect your Metamask</p>
        <button className="btn-primary" onClick={handleConnectMetamaskClick}>
          Connect wallet
        </button>
      </div>
    )
  }

  if (!isRinkeby) {
    return (
      <div>
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
  const [tokenIds, setTokenIds] = useState<BigNumber[]>([])
  const [isMintable, setIsMintable] = useState<boolean>(false)
  const [tokensCount, setTokensCount] = useState<number>(0)

  const gasPrice = useGasPrice()
  const { send } = useTransaction()

  const isDisabled = !isMintable

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

    if (tokenId) {
      setTokenId(tokenId)
    }
  }

  async function handleMint() {
    if (!tokenId || !isMintable) return

    mint(tokenId)
  }

  return (
    <section className="flex flex-col">
      <ul>
        {tokenIds.map((tokenId, index) => (
          <li key={`token_id_${tokenId.toNumber()}_${index}`}>
            {tokenId.toNumber()}
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-2">
        <input
          className="border-2"
          type="number"
          value={tokenId}
          onChange={handleChange}
        />
        <button
          className="rounded-sm bg-slate-400 p-1 hover:cursor-pointer"
          disabled={isDisabled}
          onClick={handleMint}
        >
          Create
        </button>
      </div>
    </section>
  )
}
