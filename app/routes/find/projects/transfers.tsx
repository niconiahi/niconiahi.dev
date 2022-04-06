import { useState, ReactElement, useEffect } from "react"
import type { Event } from "@ethersproject/contracts"
import type { BigNumber } from "@ethersproject/bignumber"

import { ETHERSCAN_URL } from "~/constants"
import { bigNumberToString } from "~/helpers"
import { ChainId, Transfers as TransfersContract, TransferEvent } from "~/types"
import { useXyz, useConnectMetamask, useTransfersContract } from "~/hooks"

export default function TransfersProject(): ReactElement {
  const connectMetamask = useConnectMetamask()
  const transfersContract = useTransfersContract()
  const { chainId, blockNumber } = useXyz()

  const isMainnet = chainId === ChainId.Mainnet

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  if (!transfersContract || !blockNumber) {
    return (
      <div className="flex flex-col w-full items-center justify-end space-y-2">
        <p className="text-gray-500">You need to connect your Metamask</p>
        <button className="btn-primary" onClick={handleConnectMetamaskClick}>
          Connect wallet
        </button>
      </div>
    )
  }

  if (!isMainnet) {
    return (
      <div>
        <p>This section works on Mainnet. Try changing to it from Metamask</p>
      </div>
    )
  }

  return (
    <Transfers
      blockNumber={blockNumber}
      transfersContract={transfersContract}
    />
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
      <div className="flex flex-col items-center justify-center">
        <p>Gathering information...</p>
      </div>
    )
  }

  function byConfirmations(transfer: Event) {
    return blockNumber - transfer.blockNumber > BLOCK_CONFIRMATIONS
  }

  const totalSupplyLabel = bigNumberToString(totalSupply, decimals)

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex flex-col items-center justify-center">
        <p>
          This token has{" "}
          <span className="underline underline-offset-2">{name}</span> as
          it&apos;s name
        </p>
        <p>
          This token has{" "}
          <span className="underline underline-offset-2">{symbol}</span> as
          it&apos;s symbol
        </p>
        <p>
          This token has{" "}
          <span className="underline underline-offset-2">{decimals}</span>{" "}
          decimals
        </p>
        <p>
          This token has{" "}
          <span className="underline underline-offset-2">
            {totalSupplyLabel}
          </span>{" "}
          tokens
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h3>Transfers</h3>
        <ul className="flex flex-col items-center justify-center">
          {transfers
            .filter(byConfirmations)
            .map(({ args, transactionHash }) => {
              const url = ETHERSCAN_URL + transactionHash

              const { from, to, value: bigAmount } = args
              const amount = bigNumberToString(bigAmount, decimals)

              const key = `${from}_${to}_${amount}_${transactionHash}`

              return (
                <a
                  key={key}
                  className="underline-offset-2 hover:underline"
                  href={url}
                >
                  {from} to {to} for {amount} {symbol}
                </a>
              )
            })}
        </ul>
      </div>
    </div>
  )
}
