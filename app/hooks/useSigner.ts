import { Web3Provider, JsonRpcSigner } from "@ethersproject/providers"

export function useSigner({
  metamask,
}: {
  metamask?: Web3Provider
}): JsonRpcSigner | undefined {
  if (!metamask) return undefined

  return metamask.getSigner()
}
