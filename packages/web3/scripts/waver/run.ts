import { ethers } from "hardhat"

async function main() {
  const [owner, randomPerson] = await ethers.getSigners()
  const waveContractFactory = await ethers.getContractFactory("Waver")
  const waveContract = await waveContractFactory.deploy({
    value: ethers.utils.parseEther("0.001"),
  })

  await waveContract.deployed()

  console.log("Contract deployed to:", waveContract.address)
  console.log("Contract deployed by:", owner.address)

  let contractBalance

  contractBalance = await ethers.provider.getBalance(waveContract.address)
  console.log("Contract balance: ", ethers.utils.formatEther(contractBalance))

  const wavesCount = await waveContract.getWavesCount()
  console.log("waveCount", wavesCount.toNumber())

  const waveTxOne = await waveContract.connect(randomPerson).wave("Wave #1")
  await waveTxOne.wait()

  const waveTxTwo = await waveContract.connect(randomPerson).wave("Wave #2")
  await waveTxTwo.wait()

  contractBalance = await ethers.provider.getBalance(waveContract.address)
  console.log("Contract balance: ", ethers.utils.formatEther(contractBalance))

  const waves = await waveContract.getWaves()
  console.log("waves", waves)
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
