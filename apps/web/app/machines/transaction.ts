/* eslint-disable camelcase */
import { createMachine, assign } from "xstate"
import type {
  ContractTransaction,
  ContractReceipt,
} from "@ethersproject/contracts"

import type { unstable__TransactionOn } from "~/providers/unstable__transaction-provider"

type TransactionEvent =
  | {
      type: "START"
    }
  | {
      type: "SIGNED"
      transaction: ContractTransaction
    }
  | {
      type: "ABORT"
    }
  | {
      type: "MINED"
      receipt: ContractReceipt
      transaction: ContractTransaction
    }
  | {
      type: "FAILED"
      error: Error
    }
  | {
      type: "ABORT"
      error: Error
    }

type TransactionContext = {
  on: unstable__TransactionOn
  error?: Error
  receipt?: ContractReceipt
  transaction?: ContractTransaction
}

export const transactionMachine = createMachine<
  TransactionContext,
  TransactionEvent
>({
  id: "transaction",
  context: {
    on: {},
    error: undefined,
    receipt: undefined,
    transaction: undefined,
  },
  initial: "idle",
  states: {
    idle: {
      on: {
        START: {
          target: "pending",
          actions: [(context) => context.on.IDLE?.()],
        },
      },
    },
    pending: {
      on: {
        SIGNED: {
          actions: [
            assign({ transaction: (_, event) => event.transaction }),
            (context) => context.on.PENDING?.(),
          ],
          target: "mining",
        },
        ABORT: {
          target: "idle",
        },
      },
    },
    mining: {
      on: {
        MINED: {
          actions: [
            assign({ receipt: (_, event) => event.receipt }),
            (context, event) =>
              context.on.MINED?.({
                receipt: event.receipt,
                transaction: event.transaction,
              }),
          ],
          target: "mined",
        },
        FAILED: {
          actions: assign({ error: (_, event) => event.error }),
          target: "failed",
        },
      },
    },
    mined: {
      type: "final",
    },
    failed: {
      type: "final",
    },
  },
})
