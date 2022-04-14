import { ChangeEvent, ReactElement, useEffect, useState } from "react"
import { Form } from "remix"
import type { BigNumber } from "@ethersproject/bignumber"

import { AddressDisplay } from "~/components"
import { ChainId, Waver as WaverContract } from "~/types"
import {
  useWaverContract,
  useConnectMetamask,
  useXyz,
  useTransaction,
} from "~/hooks"

export type Wave = {
  waver: string
  message: string
  timestamp: BigNumber
}

export default function WaverProject(): ReactElement {
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
      <Waver waverContract={waverContract} />
    </>
  )
}

function Waver({
  waverContract,
}: {
  waverContract: WaverContract
}): ReactElement {
  const [message, setMessage] = useState<string>("")

  const [waves, setWaves] = useState<Wave[]>([])
  const [wavesCount, setWavesCount] = useState<number>(0)

  const { send } = useTransaction()

  function handleMessageChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value: message } = event.target

    setMessage(message)
  }

  async function getWavesCount(waverContract: WaverContract): Promise<number> {
    return waverContract
      .getWavesCount()
      .then((bigWavesCount: BigNumber) => bigWavesCount.toNumber())
  }

  async function getWaves(waverContract: WaverContract): Promise<Wave[]> {
    return waverContract.getWaves()
  }

  async function handleWave(): Promise<void> {
    try {
      send(() =>
        waverContract.wave(message, {
          gasLimit: 300000,
        }),
      )

      getWavesCount(waverContract).then(setWavesCount)
      getWaves(waverContract).then(setWaves)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(
    function getInitialWaves() {
      getWaves(waverContract).then(setWaves)
    },
    [waverContract],
  )

  useEffect(
    function getInitialWavesCount() {
      getWavesCount(waverContract).then(setWavesCount)
    },
    [waverContract],
  )

  useEffect(() => {
    function handleNewWave(
      from: string,
      timestamp: BigNumber,
      message: string,
    ) {
      setWaves((prevWaves) => [
        ...prevWaves,
        { waver: from, timestamp, message },
      ])
    }

    waverContract.on("NewWave", handleNewWave)

    return () => {
      waverContract.off("NewWave", () => {
        console.warn(`Unsubscribed from "Increased" Counter contract's event`)
      })
    }
  }, [waverContract])

  return (
    <section className="flex w-full flex-col items-center justify-center space-y-4">
      <div className="flex align-middle space-x-2">
        <p className="text-gray-500">I have been waved </p>
        <span className="text-gray-900 font-bold">{wavesCount} times</span>
      </div>
      <Form className="flex flex-row space-x-4">
        <p className="flex items-center justify-end space-x-4">
          <label
            aria-label="message"
            className="text-gray-500"
            htmlFor="message"
          >
            Add your message:
          </label>
          <input
            className="h-10 w-72 border-2 border-gray-900 p-2"
            id="message"
            value={message}
            onChange={handleMessageChange}
          />
        </p>
        <button className="btn-primary" onClick={handleWave}>
          Wave
        </button>
      </Form>
      <section className="flex items-center w-full flex-col space-y-2">
        {waves
          .slice()
          .reverse()
          .map(({ message, waver }, index) => (
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
    </section>
  )
}

function Address({ children }: { children: React.ReactNode }): ReactElement {
  return (
    <p className="font-bold ml-2 text-gray-500 hover:cursor-pointer hover:text-gray-900 transition-colors duration-100">
      {children}
    </p>
  )
}
