export function numbers(length: number): number[] {
  return [...Array(length).keys()]
}

export function replace<T>(array: T[], el: T, index: number): T[] {
  return [...array.slice(0, index), el, ...array.slice(++index)]
}
