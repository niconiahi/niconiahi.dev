import type { FC } from "react"
import { useMachine } from "@xstate/react"
import { useRef } from "react"
import { useState, useContext, createContext, useEffect } from "react"
import type {
  ContractReceipt,
  ContractTransaction,
} from "@ethersproject/contracts"

// governance

import { transactionMachine } from "~/machines"
import { useTransactionToast } from "~/hooks"
import type { TransactionToastMessages } from "~/types"

export type TransactionFunction = () => Promise<ContractTransaction>
export enum TransactionStateType {
  Idle = "IDLE",
  Mined = "MINED",
  Failed = "FAILED",
  Mining = "MINING",
  Pending = "PENDING",
}

type TransactionStateMining = {
  transaction: ContractTransaction
}
export type TransactionOnMining = (state: TransactionStateMining) => void

type TransactionStateFailed = {
  error: string
}
export type TransactionOnFailed = (state: TransactionStateFailed) => void

type TransactionStateMined = {
  receipt: ContractReceipt
  transaction: ContractTransaction
}
export type TransactionOnMined = (state: TransactionStateMined) => void

export type TransactionOnIdle = () => void
export type TransactionOnPending = () => void

export type unstable__TransactionOn = Partial<{
  [TransactionStateType.Idle]: TransactionOnIdle
  [TransactionStateType.Mined]: TransactionOnMined
  [TransactionStateType.Failed]: TransactionOnFailed
  [TransactionStateType.Mining]: TransactionOnMining
  [TransactionStateType.Pending]: TransactionOnPending
}>

type Value = {
  send: (transactionFunction: TransactionFunction) => Promise<void>
  state: any
  setOn: React.Dispatch<
    React.SetStateAction<unstable__TransactionOn | undefined>
  >
}

export const TransactionContext = createContext<Value>(
  // @ts-expect-error It's a good practice not to give a default value even though the linter tells you so
  {},
)

export const TransactionProvider: FC = ({ children }) => {
  const [on, setOn] = useState<unstable__TransactionOn | undefined>(undefined)
  const [state, send] = useMachine(transactionMachine)

  useEffect(() => {
    // const handleOn = (state: any, on?: unstable__TransactionOn): void => {
    //   switch (state.state) {
    //     case TransactionStateType.Idle:
    //       invariant(
    //         state.state === TransactionStateType.Idle,
    //         "Transaction provider => state should be idle",
    //       )
    //       const onIdle = on?.[TransactionStateType.Idle]
    //       onIdle?.(state)
    //       return
    //     case TransactionStateType.Mined:
    //       invariant(
    //         state.state === TransactionStateType.Mined,
    //         "Transaction provider => state should be success",
    //       )
    //       const onMined = on?.[TransactionStateType.Mined]
    //       onMined?.(state)
    //       return
    //     case TransactionStateType.Failed:
    //       invariant(
    //         state.state === TransactionStateType.Failed,
    //         "Transaction provider => state should be failed",
    //       )
    //       const onFailed = on?.[TransactionStateType.Failed]
    //       onFailed?.(state)
    //       return
    //     case TransactionStateType.Mining:
    //       invariant(
    //         state.state === TransactionStateType.Mining,
    //         "Transaction provider => state should be mining",
    //       )
    //       const onMining = on?.[TransactionStateType.Mining]
    //       onMining?.(state)
    //       return
    //     case TransactionStateType.Pending:
    //       invariant(
    //         state.state === TransactionStateType.Pending,
    //         "Transaction provider => state should be pending",
    //       )
    //       const onPending = on?.[TransactionStateType.Pending]
    //       onPending?.(state)
    //       return
    //     default:
    //       break
    //   }
    // }
    // handleOn(state, on)
  }, [on, state])

  const sendTransaction = async (
    transactionFunction: TransactionFunction,
  ): Promise<void> => {
    try {
      send("START")

      const transaction = await transactionFunction()
      send("SIGNED", { transaction })

      const receipt = await transaction.wait()
      send("MINED", { receipt, transaction })
    } catch (error) {
      send("FAILED", { error })
    }
  }

  return (
    <TransactionContext.Provider
      value={{ state, send: sendTransaction, setOn }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransaction({
  on,
  messages,
}: {
  on?: unstable__TransactionOn
  messages?: Partial<TransactionToastMessages>
} = {}): {
  send: (transactionFunction: TransactionFunction) => Promise<void>
  state: any
} {
  const hasSetOn = useRef<boolean>(false)
  const transactionContext = useContext(TransactionContext)

  if (!transactionContext) {
    throw new Error(
      "You forgot to use your useTransaction within a TransactionProvider",
    )
  }

  const { send, state, setOn } = transactionContext

  useEffect(() => {
    if (!on) return

    if (!hasSetOn.current) {
      setOn(on)
      hasSetOn.current = true
    }
  }, [on, setOn])

  useTransactionToast({ messages })

  return {
    send,
    state,
  }
}
