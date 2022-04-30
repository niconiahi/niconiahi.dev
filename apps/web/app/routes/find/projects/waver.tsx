import { ReactElement } from "react"
import { Form, json, redirect, useActionData, useLoaderData } from "remix"
import type { ActionFunction, LoaderFunction } from "remix"
import type { BigNumber } from "@ethersproject/bignumber"

import { getRpcProvider, getWaverContract, subgraph } from "~/helpers"
import { AddressDisplay } from "~/components"
import { ChainId, Waver as WaverContract, Project } from "~/types"
import {
  useXyz,
  useTransaction,
  useWaverContract,
  useConnectMetamask,
} from "~/hooks"
import invariant from "tiny-invariant"

export type Wave = {
  waver: string
  message: string
}

type WaveResponse = {
  from: string
  message: string
}

type WavesResponse = {
  waves: WaveResponse[]
}

enum WaverErrorType {
  Empty = "EMPTY",
}

const invalid = (data: ActionData) => json(data, { status: 400 })

type ActionData = {
  error: WaverErrorType.Empty
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const message = formData.get("message")

  invariant(
    typeof message === "string",
    'Expected "message" to be of type string',
  )

  if (message.length < 1) {
    return invalid({ error: WaverErrorType.Empty })
  }

  return redirect(`/find/projects/waver?message=${encodeURI(message)}`)
}

type LoaderData = {
  waves: Wave[]
  message?: string
  wavesCount: number
}

export const loader: LoaderFunction = async ({ request }) => {
  async function getWaves(): Promise<Wave[]> {
    const query = `
      query Waves {
        waves {
          from
          message
        }
      }`

    return subgraph<WavesResponse>(query, Project.Waver)
      .then(({ waves }) => waves)
      .then((waves) =>
        waves.map(({ message, from }) => ({
          waver: from,
          message,
        })),
      )
  }

  const provider = getRpcProvider({ chainId: ChainId.Rinkeby })
  const waverContract = getWaverContract({ provider })

  async function getWavesCount(waverContract: WaverContract): Promise<number> {
    return waverContract
      .getWavesCount()
      .then((bigWavesCount: BigNumber) => bigWavesCount.toNumber())
  }

  const [waves, wavesCount] = await Promise.all([
    getWaves(),
    getWavesCount(waverContract),
  ])

  const url = new URL(request.url)
  const message = url.searchParams.get("message")

  return json<LoaderData>({
    waves,
    message: message ?? undefined,
    wavesCount,
  })
}

export default function WaverProject(): ReactElement {
  const { waves, wavesCount, message } = useLoaderData<LoaderData>()

  const waverContract = useWaverContract()
  const connectMetamask = useConnectMetamask()
  const { chainId, account } = useXyz()

  const isRinkeby = chainId === ChainId.Rinkeby

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  if (!waverContract || !account) {
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
        <h3>This section works on Rinkeby. Try changing to it from Metamask</h3>
      </div>
    )
  }

  return (
    <>
      <AddressDisplay account={account} />
      <Waver
        message={message}
        waverContract={waverContract}
        waves={waves}
        wavesCount={wavesCount}
      />
    </>
  )
}

function Waver({
  waves,
  message,
  wavesCount,
  waverContract,
}: {
  waves: Wave[]
  message?: string
  wavesCount: number
  waverContract: WaverContract
}): ReactElement {
  const isWaveDisabled = !message

  const actionData = useActionData<ActionData>()
  const error = actionData?.error

  const { send } = useTransaction()

  async function handleWave(): Promise<void> {
    console.log("waving")
    invariant(typeof message === "string", 'Expected "message" to have a value')
    console.log("handleWave ~ message", message)

    send(() =>
      waverContract.wave(message, {
        gasLimit: 300000,
      }),
    )
  }

  function getErrorMessage(type: WaverErrorType) {
    switch (type) {
      case WaverErrorType.Empty: {
        return "Your message can't be empty"
      }
    }
  }

  return (
    <>
      <section className="flex flex-col self-end items-center space-y-4 p-4 bg-gray-200 rounded-md border-2 border-gray-900">
        <Form className="flex flex-col items-center space-y-4" method="post">
          <p className="flex flex-col">
            <label className="text-gray-500" htmlFor="number">
              Leave a message:
            </label>
            <input
              aria-errormessage="message_error"
              aria-invalid="false"
              aria-required="true"
              className="h-10 w-80 border-2 border-gray-900 p-2 bg-gray-50"
              id="message"
              name="message"
            />
            {error ? (
              <span className="text-red-400" id="message_error">
                {getErrorMessage(error)}
              </span>
            ) : null}
          </p>
          <button className="btn-primary w-full" type="submit">
            Validate message
          </button>
        </Form>
        <button
          className="btn-secondary w-full h-10"
          disabled={isWaveDisabled}
          onClick={handleWave}
        >
          Wave
        </button>
      </section>
      <section className="flex items-center w-full flex-col space-y-4">
        <h3>
          I have been waved
          <span className="text-gray-900 font-bold ml-2">
            {wavesCount} times
          </span>
        </h3>
        {waves.map(({ message, waver }, index) => (
          <article
            key={`wave_card_${waver}_${message.slice(0, 10)}_${index}`}
            className="flex flex-col bg-gray-100 border-2 border-gray-200 p-2 w-fit rounded-md"
          >
            <div className="flex flex-row">
              <p className="text-gray-500">Left by</p>
              <Address>{waver}</Address>
              <p className="text-gray-500">, who said:</p>
            </div>
            <span className="text-gray-900 font-bold">
              &quot;{message}&quot;
            </span>
          </article>
        ))}
      </section>
    </>
  )
}

function Address({ children }: { children: React.ReactNode }): ReactElement {
  return (
    <p className="font-bold ml-2 text-gray-500 hover:cursor-pointer hover:text-gray-900 transition-colors duration-100">
      {children}
    </p>
  )
}
