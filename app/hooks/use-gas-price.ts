import { useEffect, useState } from "react"

const ETHERCHAIN_URL = "https://etherchain.org/api/gasPriceOracle"

export function useGasPrice(): number | undefined {
  const [gasPrice, setGasPrice] = useState<number | undefined>(undefined)

  function gweiToWei(gwei: number) {
    // TODO: investigate if it's safe to convert it like this
    return gwei * 1e9
  }

  useEffect(() => {
    async function getGasPrice() {
      fetch(ETHERCHAIN_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(({ fast: gwei }) => gweiToWei(gwei))
        .then(setGasPrice)
    }

    getGasPrice()
  }, [])

  return gasPrice
}
