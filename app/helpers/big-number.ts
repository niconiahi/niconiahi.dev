import { BigNumber } from "@ethersproject/bignumber"

import { generateArrayOfNumbers } from "~/helpers"

export function bigNumberToString(
  bigNumber: BigNumber,
  decimals: number,
): string {
  function getDivisor(decimals: number) {
    const zeros = generateArrayOfNumbers(decimals)
      .map(() => "0")
      .join("")

    return "1" + zeros
  }

  const divisor = getDivisor(decimals)

  return bigNumber.div(divisor).toString()
}

export function big(value: number | string): BigNumber {
  return BigNumber.from(value)
}
