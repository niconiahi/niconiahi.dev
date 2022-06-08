import type { ReactElement } from "react"
import { useState, useEffect } from "react"
import type { Event } from "@ethersproject/contracts"
import type { BigNumber } from "@ethersproject/bignumber"
import type { TransferEvent } from "@niconiahi/web3"

import { ETHERSCAN_URL } from "~/constants"
import { AddressDisplay } from "~/components"
import { bigNumberToString, truncate } from "~/helpers"
import { useXyz, useConnectMetamask, useTransfersContract } from "~/hooks"
import type { Transfers as TransfersContract } from "~/types"
import { ChainId } from "~/types"
import { ArrowRight } from "~/icons"

export default function TransfersProject(): ReactElement {
  const connectMetamask = useConnectMetamask()
  const transfersContract = useTransfersContract()
  const { chainId, blockNumber, account } = useXyz()

  const isMainnet = chainId === ChainId.Mainnet

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  if (!transfersContract || !blockNumber || !account) {
    return (
      <div className="flex flex-col w-full items-center justify-center space-y-2 h-full">
        <p className="text-gray-500">You need to connect your Metamask</p>
        <button className="btn-primary" onClick={handleConnectMetamaskClick}>
          Connect wallet
        </button>
      </div>
    )
  }

  if (!isMainnet) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>This section works on Mainnet. Try changing to it from Metamask</p>
      </div>
    )
  }

  return (
    <>
      <AddressDisplay account={account} />
      <Transfers
        blockNumber={blockNumber}
        transfersContract={transfersContract}
      />
    </>
  )
}

function Transfers({
  blockNumber,
  transfersContract,
}: {
  blockNumber: number
  transfersContract: TransfersContract
}): ReactElement {
  const [name, setName] = useState<string | undefined>(undefined)
  const [symbol, setSymbol] = useState<string | undefined>(undefined)
  const [decimals, setDecimals] = useState<number | undefined>(undefined)
  const [transfers, setTransfers] = useState<TransferEvent[]>([])
  const [totalSupply, setTotalSupply] = useState<BigNumber | undefined>(
    undefined,
  )

  const TRANSFER_BLOCKS_AMOUNT = 3000
  const BLOCK_CONFIRMATIONS = 20

  useEffect(() => {
    async function getPastTransfers() {
      const transfersFilter = transfersContract.filters.Transfer()
      const transfers = await transfersContract.queryFilter(
        transfersFilter,
        blockNumber - TRANSFER_BLOCKS_AMOUNT,
        blockNumber,
      )

      setTransfers(transfers)
    }

    getPastTransfers()
  }, [blockNumber, transfersContract])

  useEffect(() => {
    function handleTransferOff(transfersContract: TransfersContract) {
      transfersContract.off("Transfer", () => {
        console.warn(`Unsubscribed from "Transfer" Transfers contract's event`)
      })
    }

    function handleTransferOn(transfersContract: TransfersContract) {
      transfersContract.on("Transfer", (transfer: TransferEvent) => {
        setTransfers((prevTransfers) => [...prevTransfers, transfer])
      })
    }

    handleTransferOn(transfersContract)

    return () => {
      handleTransferOff(transfersContract)
    }
  }, [transfersContract])

  useEffect(() => {
    async function getInformation() {
      const [name, symbol, decimals, totalSupply] = await Promise.all([
        transfersContract.name(),
        transfersContract.symbol(),
        transfersContract.decimals(),
        transfersContract.totalSupply(),
      ])

      setName(name)
      setSymbol(symbol)
      setDecimals(decimals)
      setTotalSupply(totalSupply)
    }

    getInformation()
  }, [transfersContract])

  const isLoading = !name || !symbol || !decimals || !totalSupply

  if (isLoading) {
    return (
      <section className="flex flex-col items-center justify-center">
        <p>Gathering information...</p>
      </section>
    )
  }

  function byConfirmations(transfer: Event) {
    return blockNumber - transfer.blockNumber > BLOCK_CONFIRMATIONS
  }

  const totalSupplyLabel = bigNumberToString(totalSupply, decimals)

  return (
    <div className="flex flex-col items-start justify-center space-y-4">
      <section className="flex flex-col items-start justify-center">
        <h3 className="text-gray-500">Token</h3>
        <div className="bg-gray-200 p-2 rounded-md">
          <p className="text-gray-500">
            Name: <span className="font-bold text-gray-900">{name}</span>
          </p>
          <p className="text-gray-500">
            Symbol: <span className="font-bold text-gray-900">{symbol}</span>
          </p>
          <p className="text-gray-500">
            Decimals:{" "}
            <span className="font-bold text-gray-900">{decimals}</span>
          </p>
          <p className="text-gray-500">
            Amount:{" "}
            <span className="font-bold text-gray-900">{totalSupplyLabel}</span>
          </p>
        </div>
      </section>
      <section className="flex flex-col items-start justify-center">
        <h3 className="text-gray-500">Transfers</h3>
        <ul className="flex flex-col items-start justify-center space-y-2">
          {transfers
            .filter(byConfirmations)
            .map(({ args, transactionHash }) => {
              const url = ETHERSCAN_URL + transactionHash

              const { from, to, value: bigAmount } = args
              const amount = bigNumberToString(bigAmount, decimals)

              const key = `${from}_${to}_${amount}_${transactionHash}`

              return (
                <article key={key} className="flex items-center space-x-2">
                  <Transfer from={from} href={url} to={to} />
                  <p className="text-gray-500">
                    {" "}
                    for {amount} {symbol}
                  </p>
                </article>
              )
            })}
        </ul>
      </section>
    </div>
  )
}

function Transfer({
  from,
  to,
  href,
}: {
  from: string
  to: string
  href: string
}): ReactElement {
  return (
    <a
      className="flex items-center bg-gray-200 p-1 space-x-2 rounded-md transition text-gray-500 hover:bg-gray-700 hover:text-gray-100 dark:text-gray-500 dark:hover:text-gray-100"
      href={href}
    >
      <span>{truncate(from)}</span>
      <ArrowRight className="h-4 w-4" />
      <span>{truncate(to)}</span>
    </a>
  )
}
