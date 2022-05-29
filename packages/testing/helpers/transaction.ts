import type {
  TransactionReceipt,
  TransactionResponse,
} from "@ethersproject/providers"

// testing
import type {
  TransactionReceiptMock,
  TransactionResponseMock,
} from "@niconiahi/testing"
import { DELAY } from "@niconiahi/testing"

type TransactionMock = {
  receipt?: TransactionReceiptMock
  response?: TransactionResponseMock
}

export const getTransactionResponse = ({
  receipt,
  response,
}: TransactionMock = {}): TransactionResponse => {
  const wait = (): Promise<TransactionReceipt> => {
    return new Promise((resolve) => {
      const getNextReceipt = (receipt?: TransactionReceiptMock) => {
        const hasLogs = Boolean(receipt?.logs?.length)

        if (!receipt) {
          return {
            logs: [],
          }
        }

        if (!hasLogs) {
          return {
            ...receipt,
            logs: [],
          }
        }

        return receipt
      }

      const nextReceipt = getNextReceipt(receipt)
      const transactionReceipt = getTransactionReceipt(nextReceipt)

      setTimeout(() => resolve(transactionReceipt), DELAY)
    })
  }

  const transactionResponse = {
    wait,
    ...(response ?? {}),
  }

  return transactionResponse as TransactionResponse
}

export const getTransactionReceipt = (
  transactionReceipt: TransactionReceiptMock,
): TransactionReceipt => {
  return transactionReceipt as TransactionReceipt
}
