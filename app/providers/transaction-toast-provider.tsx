// TODO: integrate headless ui dialog as Toast
// import { Dialog } from "@headlessui/react"
import React, {
  FC,
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
  ReactElement,
} from "react"
import invariant from "tiny-invariant"

// web3
import { useTransaction } from "~/hooks"
import { TransactionOn, TransactionStateType, TransactionState } from "~/types"

export type TransactionToastMessages = {
  titles: {
    [TransactionStateType.Idle]: undefined
    [TransactionStateType.Mined]: string
    [TransactionStateType.Failed]: string
    [TransactionStateType.Mining]: string
    [TransactionStateType.Pending]: string
  }
  descriptions: {
    [TransactionStateType.Idle]: undefined
    [TransactionStateType.Mined]: string
    [TransactionStateType.Failed]: string
    [TransactionStateType.Mining]: string
    [TransactionStateType.Pending]: string
  }
}

const DEFAULT_OPTIONS = {
  titles: {
    [TransactionStateType.Idle]: undefined,
    [TransactionStateType.Mined]: "Transaction mined",
    [TransactionStateType.Failed]: "Transaction failed",
    [TransactionStateType.Mining]: "Transaction mining",
    [TransactionStateType.Pending]: "Transaction pending",
  },
  descriptions: {
    [TransactionStateType.Idle]: undefined,
    [TransactionStateType.Mined]: "Your transaction was mined by a miner",
    [TransactionStateType.Failed]: "Your transaction failed to be transacted",
    [TransactionStateType.Mining]:
      "Your transaction was sent to the blockchain",
    [TransactionStateType.Pending]: "Your transaction is pending to be signed",
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
    const handleOn = (state: TransactionState): void => {
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

    handleOn(state)
  }, [on, state])

  return (
    <TransactionToastContext.Provider value={{ composeMessages, setOn }}>
      {children}
      <Toast key={state.state} messages={messages} state={state} />
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

function Toast({
  state,
  messages,
}: {
  state: TransactionState
  messages: TransactionToastMessages
}): ReactElement | null {
  const { descriptions, titles } = messages

  function getTitle(type: TransactionStateType): string | undefined {
    if (type === TransactionStateType.Idle) return undefined

    return titles[type]
  }

  function getDescription(type: TransactionStateType): string | undefined {
    if (type === TransactionStateType.Idle) return undefined

    return descriptions[type]
  }

  const title = getTitle(state.state)
  const description = getDescription(state.state)

  if (state.state === TransactionStateType.Idle) return null

  return (
    <aside className="flex flex-col absolute bottom-4 right-4 border-2 p-2 border-gray-900 rounded-md space-x-2 items-center justify-center">
      <p>{title}</p>
      <p>{description}</p>
    </aside>
  )
}

// function MiningToast({
//   title,
//   description,
// }: {
//   title: string
//   description: string
// }): ReactElement {
//   const [isOpen, setIsOpen] = useState<boolean>(true)

//   return (
//     <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
//       <Dialog.Overlay />
//       <Dialog.Title>{title}</Dialog.Title>
//       <Dialog.Description>{description}</Dialog.Description>
//     </Dialog>
//   )
// }

// function MinedToast({
//   title,
//   description,
// }: {
//   title: string
//   description: string
// }): ReactElement {
//   const [isOpen, setIsOpen] = useState<boolean>(true)

//   return (
//     <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
//       <Dialog.Overlay />
//       <Dialog.Title>{title}</Dialog.Title>
//       <Dialog.Description>{description}</Dialog.Description>
//     </Dialog>
//   )
// }
