import { ReactElement, useEffect, useState } from "react"
import { Form, json, LoaderFunction, useLoaderData } from "remix"
import type { BigNumber } from "@ethersproject/bignumber"

import { AddressDisplay } from "~/components"
import { getRpcProvider, getCounterContract } from "~/helpers"
import { ChainId, Counter as CounterContract } from "~/types"
import {
  useXyz,
  useConnectMetamask,
  useCounterContract,
  useTransaction,
} from "~/hooks"

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
  const { send } = useTransaction()

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
    await send(() => counterContract.increase())
  }

  return (
    <>
      <Form className="flex flex-col self-end items-center space-y-4 p-4 bg-gray-200 rounded-md border-2 border-gray-900">
        <button className="btn-primary" onClick={handleIncrease}>
          Increase
        </button>
      </Form>
      <section className="flex flex-1 items-center">
        <p className="text-gray-500 flex align-middle space-x-2">
          <span className="text-gray-900 font-bold mr-2">
            {counterCount} counts
          </span>
          and counting!
        </p>
      </section>
    </>
  )
}
