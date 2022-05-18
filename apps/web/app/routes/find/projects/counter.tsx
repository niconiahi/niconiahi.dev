import type { ReactElement } from "react"
import { useState } from "react"
import type { LoaderFunction } from "remix"
import { Form, json, useLoaderData, useNavigate } from "remix"

import { AddressDisplay } from "~/components"
import { subgraph } from "~/helpers"
import type { Counter as CounterContract } from "~/types"
import { ChainId, Project, TransactionStateType } from "~/types"
import {
  useXyz,
  useConnectMetamask,
  useCounterContract,
  useTransaction,
} from "~/hooks"

type LoaderData = {
  counterCount: number
}

type Increment = {
  count: string
}

type IncrementsResponse = {
  increments: Increment[]
}

export const loader: LoaderFunction = async () => {
  async function getCounterCount() {
    async function getLastIncrement(): Promise<Increment> {
      const query = `
    query LastIncrement{
      increments(
        orderBy: count, 
        orderDirection: desc, 
        first: 1
      ) {
      count
      }
    }`

      return subgraph<IncrementsResponse>(query, Project.Counter)
        .then(({ increments }) => increments)
        .then((increments) => increments[0])
    }
    const { count: counterCount } = await getLastIncrement()

    return Number(counterCount)
  }

  const counterCount = await getCounterCount()

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

type Metadata = {
  name: string
  price: number
}

function Counter({
  counterCount,
  counterContract,
}: {
  counterCount: number
  counterContract: CounterContract
}): ReactElement {
  const navigate = useNavigate()
  const [metadata, setMetadata] = useState<Metadata | undefined>(undefined)

  const onMined = () => {
    console.log("metadata", metadata)

    setTimeout(() => {
      navigate("/find/projects/counter", { replace: true })
    }, 1000)
  }

  const { send } = useTransaction({
    on: {
      [TransactionStateType.Mined]: onMined,
    },
  })

  function handleIncrease(): void {
    const metadata: Metadata = { price: 1000, name: "nico" }
    setMetadata(metadata)

    send(() => counterContract.increase())
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
