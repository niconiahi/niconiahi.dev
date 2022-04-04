import { Web3Provider } from "@ethersproject/providers"
import { useEffect, useState } from "react"

export function useMetamask(): Web3Provider | undefined {
  const [provider, setProvider] = useState<Web3Provider | undefined>(undefined)

  useEffect(() => {
    if (!window || provider) return

    setProvider(new Web3Provider((window as any).ethereum))
  }, [provider])

  return provider
}
