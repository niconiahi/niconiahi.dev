import { ethers } from "hardhat"

async function main() {
  const greeterContractFactory = await ethers.getContractFactory("Greeter")

  const greeting = "Hello world"
  const greeterContract = await greeterContractFactory.deploy(greeting)

  await greeterContract.deployed()

  console.log("Greeter address =>", greeterContract.address)
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
