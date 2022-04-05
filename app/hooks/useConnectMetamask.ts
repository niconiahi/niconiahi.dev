import invariant from "tiny-invariant"
import { Web3Provider } from "@ethersproject/providers"

export function useConnectMetamask({
  metamask,
}: {
  metamask?: Web3Provider
}): () => Promise<void> {
  async function connectMetamask() {
    invariant(metamask, "You need to have Metamask installed")

    await metamask.send("eth_requestAccounts", []).then((accounts) => {
      // TODO: set "accounts" on provider
      console.log("accounts", accounts)
    })
  }

  return connectMetamask
}
