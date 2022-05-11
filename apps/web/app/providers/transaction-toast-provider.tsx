import { Dialog, Transition } from "@headlessui/react"
import type { FC, ReactElement } from "react"
import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react"
import invariant from "tiny-invariant"

import { X } from "~/icons"
import { IconButton } from "~/components"
import { useTransaction } from "~/hooks"
import type { TransactionOn, TransactionState } from "~/types"
import { TransactionStateType } from "~/types"

type Titles = {
  [TransactionStateType.Idle]: undefined
  [TransactionStateType.Mined]: string
  [TransactionStateType.Failed]: string
  [TransactionStateType.Mining]: string
  [TransactionStateType.Pending]: string
}
type Descriptions = {
  [TransactionStateType.Idle]: undefined
  [TransactionStateType.Mined]: string
  [TransactionStateType.Failed]: string
  [TransactionStateType.Mining]: string
  [TransactionStateType.Pending]: string
}
export type TransactionToastMessages = {
  titles: Titles
  descriptions: Descriptions
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
  const hasSetOn = useRef<boolean>(false)
  const hasSetMessages = useRef<boolean>(false)
  const transactionToastContext = useContext(TransactionToastContext)

  if (!transactionToastContext) {
    throw new Error(
      "You forgot to use your useTransactionToast within a TransactionToastProvider",
    )
  }

  const { composeMessages, setOn } = transactionToastContext

  useEffect(() => {
    if (!messages) return

    if (!hasSetMessages.current) {
      composeMessages(messages)
      hasSetMessages.current = true
    }
  }, [composeMessages, messages])

  useEffect(() => {
    if (!on) return

    if (!hasSetOn.current) {
      setOn(on)
      hasSetOn.current = true
    }
  }, [on, setOn])
}

function Toast({
  state,
  messages,
}: {
  state: TransactionState
  messages: TransactionToastMessages
}): ReactElement | null {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const { descriptions, titles } = messages

  function getTitle(
    { state }: TransactionState,
    titles: Titles,
  ): string | undefined {
    if (state === TransactionStateType.Idle) return undefined

    return titles[state]
  }

  function getDescription(
    { state }: TransactionState,
    descriptions: Descriptions,
  ): string | undefined {
    if (state === TransactionStateType.Idle) return undefined

    return descriptions[state]
  }

  const title = getTitle(state, titles)
  const description = getDescription(state, descriptions)

  if (state.state === TransactionStateType.Idle) return null

  return (
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      show={isOpen}
    >
      <Dialog
        className="bg-gray-50 fixed bottom-4 right-4 border-2 border-gray-900 rounded-md p-2"
        onClose={() => setIsOpen(false)}
      >
        <div className="relative w-full h-full">
          <Dialog.Overlay />

          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          <IconButton
            className="absolute top-0 right-0 p-0"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </IconButton>
        </div>
      </Dialog>
    </Transition>
  )
}
