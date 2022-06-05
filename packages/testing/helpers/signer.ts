import type { JsonRpcSigner } from "@ethersproject/providers"

// testing
import type { BaseProviderMock } from "@niconiahi/testing"
import { getBaseProvider } from "@niconiahi/testing"

type Options = BaseProviderMock & {
  address: string
}

export function getSigner({
  address,
  blockNumber,
  chainReference,
  transactionResponse,
}: Options): JsonRpcSigner {
  const baseProvider = getBaseProvider({
    blockNumber,
    chainReference,
    transactionResponse,
  })

  function getAddress() {
    return address
  }

  const signer = {
    // "getAddress" is required, as it's internally checked
    // https://github.com/ethers-io/ethers.js/blob/master/packages/contracts/src.ts/index.ts#L196
    getAddress,
    // "_isSigner" is required, as it's internally checked
    // https://github.com/ethers-io/ethers.js/blob/master/packages/abstract-signer/src.ts/index.ts#L336
    _isSigner: true,
    ...baseProvider,
  }

  return signer as unknown as JsonRpcSigner
}
