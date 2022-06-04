/* eslint-disable camelcase */
import type { InterpreterFrom } from "xstate"
import { createMachine, assign } from "xstate"
import type {
  ContractReceipt,
  ContractTransaction,
} from "@ethersproject/contracts"

import type { TransactionOn } from "~/providers/transaction-provider"

export type TransactionMachineSend = InterpreterFrom<
  typeof transactionMachine
>["send"]
export type TransactionMachineState = InterpreterFrom<
  typeof transactionMachine
>["state"]
export type TransactionMachineService = InterpreterFrom<
  typeof transactionMachine
>

type TransactionMachineEvent =
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
  | {
      type: "SET_ON"
      on: TransactionOn
    }

type TransactionMachineContext = {
  on: TransactionOn
  error?: Error
  receipt?: ContractReceipt
  transaction?: ContractTransaction
}

type TransactionMachineTypestate =
  | {
      value: "idle"
      context: TransactionMachineContext
    }
  | {
      value: "pending"
      context: TransactionMachineContext
    }
  | {
      value: "mining"
      context: TransactionMachineContext & {
        transaction: ContractTransaction
      }
    }
  | {
      value: "mined"
      context: TransactionMachineContext & {
        receipt: ContractReceipt
        transaction: ContractTransaction
      }
    }
  | {
      value: "failed"
      context: TransactionMachineContext & {
        error: Error
      }
    }

export const transactionMachine = createMachine<
  TransactionMachineContext,
  TransactionMachineEvent,
  TransactionMachineTypestate
>({
  id: "transaction",
  context: {
    on: {
      mined: undefined,
      mining: undefined,
      failed: undefined,
      pending: undefined,
    },
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
        },
      },
    },
    pending: {
      entry: [(context) => context.on.pending?.()],
      on: {
        SIGNED: {
          actions: [assign({ transaction: (_, event) => event.transaction })],
          target: "mining",
        },
        ABORT: {
          target: "idle",
        },
      },
    },
    mining: {
      entry: [
        (context) =>
          context.on.mining?.({
            transaction: context.transaction as ContractTransaction,
          }),
      ],
      on: {
        MINED: {
          actions: [assign({ receipt: (_, event) => event.receipt })],
          target: "mined",
        },
        FAILED: {
          actions: [assign({ error: (_, event) => event.error })],
          target: "failed",
        },
      },
    },
    mined: {
      entry: [
        (context) =>
          context.on.mined?.({
            receipt: context.receipt as ContractReceipt,
            transaction: context.transaction as ContractTransaction,
          }),
      ],
      type: "final",
    },
    failed: {
      entry: [
        (context) =>
          context.on.failed?.({
            error: context.error as Error,
          }),
      ],
      type: "final",
    },
  },
  on: {
    SET_ON: {
      actions: [assign({ on: (_, event) => event.on })],
    },
  },
})
