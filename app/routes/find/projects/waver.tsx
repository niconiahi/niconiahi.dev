import { ChangeEvent, ReactElement, useEffect, useState } from "react"
import type { BigNumber } from "@ethersproject/bignumber"

import { ChainId, Waver as WaverContract } from "~/types"
import {
  useSigner,
  useAccount,
  useChainId,
  useMetamask,
  useWaverContract,
  useConnectMetamask,
} from "~/hooks"

export type Wave = {
  waver: string
  message: string
  timestamp: BigNumber
}

export default function WaverProject(): ReactElement {
  const metamask = useMetamask()

  const signer = useSigner({ metamask })
  const chainId = useChainId({ metamask })
  const account = useAccount({ metamask })
  const waverContract = useWaverContract({ signer })
  const connectMetamask = useConnectMetamask({ metamask })

  const isRinkeby = chainId === ChainId.Rinkeby

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  if (!waverContract || !account) {
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
        <h3>This section works on Rinkeby. Try changing to it from Metamask</h3>
      </div>
    )
  }

  return <Waver account={account} waverContract={waverContract} />
}

function Waver({
  account,
  waverContract,
}: {
  account: string
  waverContract: WaverContract
}): ReactElement {
  const [message, setMessage] = useState<string>("")

  const [waves, setWaves] = useState<Wave[]>([])
  const [wavesCount, setWavesCount] = useState<number>(0)

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
      const waveTxn = await waverContract.wave(message, {
        gasLimit: 300000,
      })
      console.log("Mining =>", waveTxn.hash)

      await waveTxn.wait()
      console.log("Mined => ", waveTxn.hash)

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
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-2xl">Wave at me</h1>
      <h3>I have been waved {wavesCount} times</h3>
      <div className="flex w-full flex-col items-stretch space-y-2">
        <div className="flex w-full items-center justify-end space-x-2">
          <h3>
            Connected with account{" "}
            <span className="text-indigo-500 underline underline-offset-2">
              {account}
            </span>
          </h3>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <label aria-label="message" htmlFor="message">
            Add your message:
          </label>
          <input
            className="h-10 w-72 border-2 border-indigo-500 p-2"
            id="message"
            value={message}
            onChange={handleMessageChange}
          />

          <button
            className="rounded-sm bg-indigo-500 p-2 text-white"
            onClick={handleWave}
          >
            Wave
          </button>
        </div>
        <section className="flex w-full flex-col space-y-2">
          {waves
            ? waves.map(({ message, waver }, index) => (
                <article
                  key={`wave_card_${waver}_${message.slice(0, 10)}_${index}`}
                  className="bg-red-300 p-2"
                >
                  <p>
                    Waver {waver} said: {message}
                  </p>
                </article>
              ))
            : null}
        </section>
      </div>
    </div>
  )
}
