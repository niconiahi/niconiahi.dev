// it's used by "etherjs", to use the same types, we need it. Here it is:
// https://github.com/ethers-io/ethers.js/blob/master/packages/properties/src.ts/index.ts#L25
export * from "./contract"
export * from "./transaction"

export type { BaseProviderMock } from "@niconiahi/testing/helpers/providers/base"
