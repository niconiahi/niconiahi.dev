import type { FC } from "react"
import { useRef } from "react"
import invariant from "tiny-invariant"
import { useState, useContext, createContext, useEffect } from "react"
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
  setOn: React.Dispatch<React.SetStateAction<TransactionOn | undefined>>
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
  const [on, setOn] = useState<TransactionOn | undefined>(undefined)
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

  useEffect(() => {
    const handleOn = (state: TransactionState, on?: TransactionOn): void => {
      switch (state.state) {
        case TransactionStateType.Idle:
          invariant(
            state.state === TransactionStateType.Idle,
            "Transaction provider => state should be idle",
          )

          const onIdle = on?.[TransactionStateType.Idle]
          onIdle?.(state)

          return
        case TransactionStateType.Mined:
          invariant(
            state.state === TransactionStateType.Mined,
            "Transaction provider => state should be success",
          )

          const onMined = on?.[TransactionStateType.Mined]
          onMined?.(state)

          return
        case TransactionStateType.Failed:
          invariant(
            state.state === TransactionStateType.Failed,
            "Transaction provider => state should be failed",
          )

          const onFailed = on?.[TransactionStateType.Failed]
          onFailed?.(state)

          return
        case TransactionStateType.Mining:
          invariant(
            state.state === TransactionStateType.Mining,
            "Transaction provider => state should be mining",
          )

          const onMining = on?.[TransactionStateType.Mining]
          onMining?.(state)

          return
        case TransactionStateType.Pending:
          invariant(
            state.state === TransactionStateType.Pending,
            "Transaction provider => state should be pending",
          )

          const onPending = on?.[TransactionStateType.Pending]
          onPending?.(state)

          return
        default:
          break
      }
    }

    handleOn(state, on)
  }, [on, state])

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
    <TransactionContext.Provider value={{ state, send, setOn }}>
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
