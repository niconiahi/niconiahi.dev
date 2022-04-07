import { ReactElement, useEffect, useState } from "react"
import { json, LoaderFunction, useLoaderData } from "remix"
import type { BigNumber } from "@ethersproject/bignumber"

import { AddressDisplay } from "~/components"
import { getRpcProvider, getCounterContract } from "~/helpers"
import { ChainId, Counter as CounterContract } from "~/types"
import { useXyz, useConnectMetamask, useCounterContract } from "~/hooks"

type LoaderData = {
  counterCount: number
}

export const loader: LoaderFunction = async () => {
  const chainId = ChainId.Rinkeby
  const provider = getRpcProvider({ chainId })
  const counterContract = getCounterContract({ provider })

  async function getCounterCount(counterContract: CounterContract) {
    const currentCount = await counterContract.value()
    const counterCount = currentCount.toNumber()

    return counterCount
  }

  const counterCount = await getCounterCount(counterContract)

  return json<LoaderData>({ counterCount })
}

export default function CounterProject(): ReactElement {
  const { counterCount } = useLoaderData<LoaderData>()

  const counterContract = useCounterContract()
  const connectMetamask = useConnectMetamask()
  const { chainId, account } = useXyz()

  const isRinkeby = chainId === ChainId.Rinkeby

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  if (
    account === undefined ||
    chainId === undefined ||
    counterContract === undefined
  ) {
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
      <Counter counterContract={counterContract} counterCount={counterCount} />
    </>
  )
}

function Counter({
  counterCount: initialCounterCount,
  counterContract,
}: {
  counterCount: number
  counterContract: CounterContract
}): ReactElement {
  const [counterCount, setCounterCount] = useState<undefined | number>(
    initialCounterCount,
  )

  useEffect(
    function handleIncreasedEvent() {
      counterContract.on("Increased", (bigNextCounter: BigNumber) => {
        const nextCounter = bigNextCounter.toNumber()

        setCounterCount(nextCounter)
      })

      return () => {
        counterContract.off("Increased", () => {
          console.warn(`Unsubscribed from "Increased" Counter contract's event`)
        })
      }
    },
    [counterContract],
  )

  async function handleIncrease(): Promise<void> {
    await counterContract.increase()
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <p className="text-gray-500">{counterCount} counts and counting!</p>
      <button className="btn-primary" onClick={handleIncrease}>
        Increase
      </button>
    </div>
  )
}
