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

export function getTransactionResponse({
  receipt,
  response,
}: TransactionMock = {}): TransactionResponse {
  function wait(): Promise<TransactionReceipt> {
    return new Promise((resolve) => {
      function getNextReceipt(receipt?: TransactionReceiptMock) {
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

export function getTransactionReceipt(
  transactionReceipt: TransactionReceiptMock,
): TransactionReceipt {
  return transactionReceipt as TransactionReceipt
}
