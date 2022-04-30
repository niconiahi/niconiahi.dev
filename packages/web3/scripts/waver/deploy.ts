import { ethers } from "hardhat"

async function main() {
  const waveContractFactory = await ethers.getContractFactory("Waver")
  const waveContract = await waveContractFactory.deploy({
    value: ethers.utils.parseEther("0.001"),
  })

  await waveContract.deployed()

  console.log("Wave portal address =>", waveContract.address)
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
