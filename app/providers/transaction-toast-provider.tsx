import React, {
  FC,
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react"
import invariant from "tiny-invariant"

// web3
import { useTransaction } from "~/hooks"
import { TransactionOn, TransactionStateType, TransactionState } from "~/types"

export type TransactionToastMessages = {
  titles: Record<TransactionStateType, string | undefined>
  descriptions: Record<TransactionStateType, string | undefined>
}

const DEFAULT_OPTIONS = {
  titles: {
    [TransactionStateType.Idle]: undefined,
    [TransactionStateType.Mined]: "Transaction succeeded",
    [TransactionStateType.Failed]: "Transaction mining",
    [TransactionStateType.Mining]: "Transaction mining",
    [TransactionStateType.Pending]: "Transaction pending",
    [TransactionStateType.Confirmed]: "Transaction confirmed",
  },
  descriptions: {
    [TransactionStateType.Idle]: undefined,
    [TransactionStateType.Mined]: "Your transaction was mined by a miner",
    [TransactionStateType.Failed]: "Your transaction failed to be transacted",
    [TransactionStateType.Mining]:
      "Your transaction was sent to the blockchain",
    [TransactionStateType.Pending]: "Your transaction is pending to be signed",
    [TransactionStateType.Confirmed]:
      "Your transaction was confirmed after a few blocks",
  },
}

type Value = {
  setOn: React.Dispatch<React.SetStateAction<TransactionOn | undefined>>
  composeMessages: (userOptions: Partial<TransactionToastMessages>) => void
}

export const TransactionToastContext = createContext<Value>(
  // @ts-expect-error It's a good practice not to give a default value even though the linter tells you so
  {},
)

export const TransactionToastProvider: FC = ({ children }) => {
  const [on, setOn] = useState<TransactionOn | undefined>(undefined)
  const [messages, setMessages] =
    useState<TransactionToastMessages>(DEFAULT_OPTIONS)

  const { state } = useTransaction()

  const composeMessages = (nextMessages: Partial<TransactionToastMessages>) => {
    const getMessages = (
      defaultMessages: TransactionToastMessages,
      nextMessages: Partial<TransactionToastMessages>,
    ) => {
      const messages = {
        ...defaultMessages,
        ...nextMessages,
      }

      return messages
    }

    const messages = getMessages(DEFAULT_OPTIONS, nextMessages)

    setMessages(messages)
  }

  // effects
  useEffect(() => {
    const updateToast = (
      state: TransactionState,
      messages: TransactionToastMessages,
    ): void => {
      const { descriptions, titles } = messages

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
          console.log("render mined toast")

          invariant(
            state.state === TransactionStateType.Mined,
            "Transaction provider => state should be success",
          )

          const onMined = on?.[TransactionStateType.Mined]
          onMined?.(state)

          setTimeout(() => {
            // close toast
          }, 3000)

          return
        case TransactionStateType.Failed:
          console.log("render failed toast")

          invariant(
            state.state === TransactionStateType.Failed,
            "Transaction provider => state should be failed",
          )

          const onFailed = on?.[TransactionStateType.Failed]
          onFailed?.(state)

          setTimeout(() => {
            // close toast
          }, 3000)

          return
        case TransactionStateType.Mining:
          console.log("render mining toast")
          console.log("mining toast title =>", titles[state.state])
          console.log("mining toast description =>", descriptions[state.state])

          // <MiningToast
          //   description={descriptions[state]}
          //   title={titles[state]}
          // />,

          invariant(
            state.state === TransactionStateType.Mining,
            "Transaction provider => state should be mining",
          )

          const onMining = on?.[TransactionStateType.Mining]
          onMining?.(state)

          return
        case TransactionStateType.Pending:
          console.log("render pending toast")

          invariant(
            state.state === TransactionStateType.Pending,
            "Transaction provider => state should be pending",
          )

          const onPending = on?.[TransactionStateType.Pending]
          onPending?.(state)

          return
        case TransactionStateType.Confirmed:
          console.log("render confirmed toast")

          invariant(
            state.state === TransactionStateType.Confirmed,
            "Transaction provider => state should be confirmed",
          )

          const onConfirmed = on?.[TransactionStateType.Confirmed]
          onConfirmed?.(state)

          return
        default:
          break
      }
    }

    updateToast(state, messages)
  }, [messages, on, state])

  return (
    <TransactionToastContext.Provider value={{ composeMessages, setOn }}>
      {children}
    </TransactionToastContext.Provider>
  )
}

export const useTransactionToast = ({
  on,
  messages,
}: {
  on?: TransactionOn
  messages?: Partial<TransactionToastMessages>
} = {}): void => {
  const mounted = useRef<boolean>(false)
  const transactionToastContext = useContext(TransactionToastContext)

  if (!transactionToastContext) {
    throw new Error(
      "You forgot to use your useTransactionToast within a TransactionToastProvider",
    )
  }

  const { composeMessages, setOn } = transactionToastContext

  useEffect(() => {
    if (!messages) return

    if (!mounted.current) {
      composeMessages(messages)

      if (on) {
        setOn(on)
      }

      mounted.current = true
    }
  }, [composeMessages, messages, mounted, on, setOn])
}
