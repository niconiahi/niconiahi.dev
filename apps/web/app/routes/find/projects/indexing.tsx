import type { ReactElement } from "react"
import { useState, useEffect } from "react"
import { BigNumber } from "@ethersproject/bignumber"
import type { TransferEvent } from "@niconiahi/web3"

import type { Erc20 } from "~/types"
import { ChainId } from "~/types"
import { getBlockNumber, getErc20Contract } from "~/helpers"

const COMPOUND_ADDRESS = "0xc00e94cb662c3520282e6f5717214004a7f26888"
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

type IndexedSegment = {
  to: number
  from: number
  tranferEvents: TransferEvent[]
}

type Block = {
  hash: string
  number: number
}

type Balance = {
  block: Block
  weight: BigNumber
  address: string
}

type BalanceMapping = {
  [address: string]: {
    block: Block
    weight: BigNumber
  }
}

export default function IndexingProject(): ReactElement {
  const [balances, setBalances] = useState<Balance[]>([])
  const [indexedSegments, setIndexedSegments] = useState<IndexedSegment[]>([])

  function getBalanceMapping(transferEvents: TransferEvent[]) {
    const balances = transferEvents.reduce((prevBalances, transferEvent) => {
      const [from, to, weight] = transferEvent.args
      console.log("********************************************")
      console.log("New transfer event:")
      console.log("To =>", to)
      console.log("From =>", from)
      console.log("Weight =>", weight)
      console.log("********************************************")

      let nextBalances = {
        ...prevBalances,
      }
      const isMinting = from === ZERO_ADDRESS
      const shouldUpdateFromBalance = !isMinting

      const { blockNumber, blockHash } = transferEvent

      const block = {
        hash: blockHash,
        number: blockNumber,
      }

      if (shouldUpdateFromBalance) {
        const balance = prevBalances[from]?.weight ?? BigNumber.from(0)
        const nextBalance = balance.sub(weight)

        function composeFromBalance(from: string, nextBalance: BigNumber) {
          nextBalances = {
            ...nextBalances,
            [from]: {
              block,
              weight: nextBalance,
            },
          }
        }

        composeFromBalance(from, nextBalance)
      }

      const isBurning = to === ZERO_ADDRESS
      const shouldUpdateToBalance = !isBurning

      if (shouldUpdateToBalance) {
        const balance = prevBalances[to]?.weight ?? BigNumber.from(0)
        const nextBalance = balance.sub(weight)

        function composeToBalance(to: string, nextBalance: BigNumber) {
          nextBalances = {
            ...nextBalances,
            [to]: {
              block,
              weight: nextBalance,
            },
          }
        }

        composeToBalance(to, nextBalance)
      }

      return nextBalances
    }, {} as BalanceMapping)

    return balances
  }

  function mappingToBalances(balanceMapping: BalanceMapping): Balance[] {
    const balances: Balance[] = Object.entries(balanceMapping).map(
      ([address, { block, weight }]) => ({ address, weight, block }),
    )

    return balances
  }

  useEffect(() => {
    async function getTransferEvents(
      startBlock: number,
      endBlock: number,
      erc20Contract: Erc20,
    ): Promise<void> {
      const BATCH_SIZE = 100
      const transfersFilter = erc20Contract.filters.Transfer()

      for (
        let fromBlock = startBlock;
        fromBlock <= endBlock;
        fromBlock += BATCH_SIZE
      ) {
        const toBlock = Math.min(fromBlock + BATCH_SIZE - 1, endBlock)

        const nextTransferEvents = await erc20Contract.queryFilter(
          transfersFilter,
          fromBlock,
          toBlock,
        )

        console.log("--------------------------------------------")
        console.log("indexTranferEvents ~ fromBlock", fromBlock)
        console.log("indexTranferEvents ~ toBlock", toBlock)
        console.log(
          "indexTranferEvents ~ nextTransferEvents",
          nextTransferEvents,
        )
        console.log("--------------------------------------------")

        setIndexedSegments((prevIndexedSegments) => [
          ...prevIndexedSegments,
          { from: fromBlock, to: toBlock, tranferEvents: nextTransferEvents },
        ])

        const balanceMapping = getBalanceMapping(nextTransferEvents)
        const balances = mappingToBalances(balanceMapping)

        setBalances((prevBalances) => [...prevBalances, ...balances])
      }
    }

    async function startIndexer() {
      const chainId = ChainId.Mainnet
      const blockNumber = await getBlockNumber({ chainId })
      const startBlock = blockNumber - 500
      const erc20Contract = getErc20Contract({
        address: COMPOUND_ADDRESS,
        chainId,
      })

      getTransferEvents(startBlock, blockNumber, erc20Contract)
    }

    startIndexer()
  }, [])

  useEffect(() => {
    const chainId = ChainId.Mainnet
    const erc20Contract = getErc20Contract({
      address: COMPOUND_ADDRESS,
      chainId,
    })

    function handleTransferOff(erc20Contract: Erc20) {
      erc20Contract.off("Transfer", () => {
        console.warn(`Unsubscribed from "Transfer" Transfers contract's event`)
      })
    }

    function handleTransferOn(erc20Contract: Erc20) {
      erc20Contract.on(
        "Transfer",
        (_, __, ___, transferEvent: TransferEvent) => {
          const transferEvents = [transferEvent]
          const balanceMapping = getBalanceMapping(transferEvents)
          const balances = mappingToBalances(balanceMapping)

          setBalances((prevBalances) => [...prevBalances, ...balances])
        },
      )
    }

    handleTransferOn(erc20Contract)

    return () => {
      handleTransferOff(erc20Contract)
    }
  }, [])

  // TODO:
  // https://github.com/ethers-io/ethers.js/issues/385#issuecomment-492093000
  // 1. handle reorgs => page 192
  // 2. revert changes on balances since reorg => page 193/194

  return (
    <div className="flex flex-col">
      <h1>IndexingProject</h1>
      <h2>Indexed segments</h2>
      {indexedSegments.map(({ from, to, tranferEvents }) => (
        <div
          key={from + to + tranferEvents.length}
          className="flex flex-col border border-gray-900 p-2 space-y-2 mt-2"
        >
          <span>From block: {from}</span>
          <span>To block: {to}</span>
          <span>Indexed {tranferEvents.length} tranfer events</span>
        </div>
      ))}
      <h2>Token balances changes</h2>
      {balances.map(({ address, weight }, index) => (
        <span key={address + weight.toString() + "position" + index}>
          {weight.toString()}
        </span>
      ))}
    </div>
  )
}
