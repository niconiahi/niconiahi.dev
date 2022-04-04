import { ReactElement, useEffect, useState } from "react"
import type { BigNumber } from "@ethersproject/bignumber"

import { ChainId, Counter as CounterContract } from "~/types"
import {
  useAccount,
  useChainId,
  useMetamask,
  useCounterContract,
  useConnectMetamask,
} from "~/hooks"

export default function CounterProject(): ReactElement {
  const metamask = useMetamask()
  const account = useAccount({ metamask })
  const chainId = useChainId({ metamask })
  const counterContract = useCounterContract()
  const connectMetamask = useConnectMetamask()

  const isRinkeby = chainId === ChainId.Rinkeby

  async function handleConnectMetamaskClick(): Promise<void> {
    console.log("clicking connect metamask")

    connectMetamask()
  }

  if (!account || !counterContract) {
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

  return <Counter account={account} counterContract={counterContract} />
}

function Counter({
  account,
  counterContract,
}: {
  account: string
  counterContract: CounterContract
}): ReactElement {
  const [counter, setCounter] = useState<undefined | number>(undefined)

  useEffect(() => {
    async function getCounterCount(counterContract: CounterContract) {
      const currentCount = await counterContract.value()
      const counter = currentCount.toNumber()

      setCounter(counter)
    }

    getCounterCount(counterContract)
  }, [counterContract])

  useEffect(
    function handleIncreasedEvent() {
      counterContract.on("Increased", (bigNextCounter: BigNumber) => {
        const nextCounter = bigNextCounter.toNumber()

        setCounter(nextCounter)
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
    <div className="flex flex-col items-start">
      <button onClick={handleIncrease}>Increase</button>
      <span>Counter: {counter}</span>
      <span>Signer: {account}</span>
    </div>
  )
}
