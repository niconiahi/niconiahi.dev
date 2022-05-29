import type { Log } from "@ethersproject/providers"

// Add entries as you need, that you expect to receive as "transaction receipt"
export type TransactionReceiptMock = {
  to?: string
  // "logs" are required, as it's internally checked
  // https://github.com/ethers-io/ethers.js/blob/master/packages/contracts/src.ts/index.ts#L338
  logs?: Array<Log>
  from?: string
}

// Add entries as you need, that you expect to receive as "transaction response"
export type TransactionResponseMock = {
  from?: string
}
