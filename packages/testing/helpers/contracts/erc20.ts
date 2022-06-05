import type { ERC20 } from "@niconiahi/web3"
import type { ContractTransaction } from "@ethersproject/contracts"

// testing
import type { ContractReceiptMock } from "@niconiahi/testing"
import { DELAY, getContractTransaction } from "@niconiahi/testing"

export function getErc20Contract(): ERC20 {
  function delegate(delegatee: string): Promise<ContractTransaction> {
    return new Promise((resolve) => {
      const contractReceiptMock: ContractReceiptMock = {
        to: delegatee,
      }

      const contractTransaction = getContractTransaction({
        receipt: contractReceiptMock,
      })

      setTimeout(() => resolve(contractTransaction), DELAY)
    })
  }

  const erc20Contract = {
    delegate,
  }

  return erc20Contract as unknown as ERC20
}
