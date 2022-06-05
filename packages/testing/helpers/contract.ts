import type {
  ContractReceipt,
  ContractTransaction,
} from "@ethersproject/contracts"

// testing
import type {
  ContractReceiptMock,
  ContractTransactionMock,
} from "@niconiahi/testing"
import { DELAY } from "@niconiahi/testing"

type ContractMock = {
  receipt?: ContractReceiptMock
  transaction?: ContractTransactionMock
}

export function getContractTransaction({
  receipt,
  transaction,
}: ContractMock = {}): ContractTransaction {
  function wait(): Promise<ContractReceipt> {
    return new Promise((resolve) => {
      const nextReceipt = receipt ?? {}
      const contractReceipt = getContractReceipt(nextReceipt)

      setTimeout(() => resolve(contractReceipt), DELAY)
    })
  }

  const contractTransaction = {
    wait,
    ...(transaction ?? {}),
  }

  return contractTransaction as ContractTransaction
}

export function getContractReceipt(
  contractReceipt: ContractReceiptMock,
): ContractReceipt {
  return contractReceipt as ContractReceipt
}
