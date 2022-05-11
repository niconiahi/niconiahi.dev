import type { FC } from "react"
import React, { useState, useContext, createContext, useEffect } from "react"
import type {
  ContractTransaction,
  ContractReceipt,
} from "@ethersproject/contracts"

// governance

import { useTransactionToast } from "~/hooks"
import type { TransactionToastMessages } from "~/types"

type TransactionStateIdle = {
  state: TransactionStateType.Idle
}

type TransactionStateMined = {
  state: TransactionStateType.Mined
  receipt: ContractReceipt
  transaction: ContractTransaction
}

type TransactionStateFailed = {
  state: TransactionStateType.Failed
  error: string
}

type TransactionStateMining = {
  state: TransactionStateType.Mining
  transaction: ContractTransaction
}

type TransactionStatePending = {
  state: TransactionStateType.Pending
}

export type TransactionFunction = () => Promise<ContractTransaction>
export enum TransactionStateType {
  Idle = "IDLE",
  Mined = "MINED",
  Failed = "FAILED",
  Mining = "MINING",
  Pending = "PENDING",
}

export type TransactionState =
  | TransactionStateIdle
  | TransactionStateMined
  | TransactionStateFailed
  | TransactionStateMining
  | TransactionStatePending

export type TransactionOnIdle = (state: TransactionStateIdle) => void
export type TransactionOnMined = (state: TransactionStateMined) => void
export type TransactionOnFailed = (state: TransactionStateFailed) => void
export type TransactionOnMining = (state: TransactionStateMining) => void
export type TransactionOnPending = (state: TransactionStatePending) => void

export type TransactionOn = Partial<{
  [TransactionStateType.Idle]: TransactionOnIdle
  [TransactionStateType.Mined]: TransactionOnMined
  [TransactionStateType.Failed]: TransactionOnFailed
  [TransactionStateType.Mining]: TransactionOnMining
  [TransactionStateType.Pending]: TransactionOnPending
}>

type Value = {
  send: (transactionFunction: TransactionFunction) => Promise<void>
  state: TransactionState
}

export const TransactionContext = createContext<Value>(
  // @ts-expect-error It's a good practice not to give a default value even though the linter tells you so
  {},
)

const DEFAULT_STATUS: TransactionState = {
  state: TransactionStateType.Idle,
}

export const TransactionProvider: FC = ({ children }) => {
  // states
  const [state, setState] = useState<TransactionState>(DEFAULT_STATUS)

  useEffect(() => {
    if (state.state !== TransactionStateType.Mined) return

    setTimeout(() => {
      setState({ state: TransactionStateType.Idle })
    }, 5000)
  }, [state])

  useEffect(() => {
    if (state.state !== TransactionStateType.Failed) return

    setTimeout(() => {
      setState({ state: TransactionStateType.Idle })
    }, 5000)
  }, [state])

  const send = async (
    transactionFunction: TransactionFunction,
  ): Promise<void> => {
    try {
      setState({ state: TransactionStateType.Pending })

      const transaction = await transactionFunction()
      setState({ state: TransactionStateType.Mining, transaction })

      const receipt = await transaction.wait()
      setState({
        state: TransactionStateType.Mined,
        receipt,
        transaction,
      })
    } catch (error) {
      // TODO: handle error

      setState({
        state: TransactionStateType.Failed,
        error: "Error while executing the transaction",
      })
    }
  }

  return (
    <TransactionContext.Provider value={{ state, send }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransaction({
  on,
  messages,
}: {
  on?: TransactionOn
  messages?: Partial<TransactionToastMessages>
} = {}): {
  send: (transactionFunction: TransactionFunction) => Promise<void>
  state: TransactionState
} {
  const transactionContext = useContext(TransactionContext)

  if (!transactionContext) {
    throw new Error(
      "You forgot to use your useTransaction within a TransactionProvider",
    )
  }

  const { send, state } = transactionContext

  useTransactionToast({ messages, on })

  return {
    send,
    state,
  }
}
