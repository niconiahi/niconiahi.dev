const ETHERCHAIN_URL = "https://etherchain.org/api/gasPriceOracle"

export function getGasPrice(): Promise<number> {
  function gweiToWei(gwei: number) {
    // TODO: investigate if it's safe to convert it like this
    return gwei * 1e9
  }

  return fetch(ETHERCHAIN_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(({ fast: gwei }) => gweiToWei(gwei))
}
