// Add entries as you need, that you expect to receive as "contract transaction"
export type ContractTransactionMock = {
  from?: string
}

// Add entries as you need, that you expect to receive as "contract receipt"
export type ContractReceiptMock = {
  to?: string
  from?: string
}
