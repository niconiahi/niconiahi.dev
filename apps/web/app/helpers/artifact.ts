import { Artifact } from "hardhat/types"

export function getAbi(artifact: Artifact): any[] {
  const { abi } = artifact

  return abi
}
