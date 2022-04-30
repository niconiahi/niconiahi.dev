import { ethers } from "hardhat"

async function main() {
  const mintFactory = await ethers.getContractFactory("Mint")

  const mintContract = await mintFactory.deploy()

  await mintContract.deployed()

  // TODO: save to FS the new "mintContract.address"

  console.log("Mint address =>", mintContract.address)
}

async function runMain() {
  try {
    await main()

    process.exit(0)
  } catch (error) {
    console.log(error)

    process.exit(1)
  }
}

runMain()
