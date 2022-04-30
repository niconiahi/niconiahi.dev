import { ethers } from "hardhat"

async function main() {
  const [owner] = await ethers.getSigners()

  const greeterContractFactory = await ethers.getContractFactory("Greeter")

  const greeting = "Hello world"
  const greeterContract = await greeterContractFactory.deploy(greeting)

  await greeterContract.deployed()

  // 1. We can send the encoded version of "setGreeting" via "sendTransaction" low-level API
  // 2. If we are limited by gas, we can always alter "gasLimit" on the sent tx
  // 3. Also we can calculate "gasPrice", external services like "EthGasStation" being the
  //    best options due to hard calculations that need to be done
  // 4. We can opt to resend a tx by using the same "nonce" with a higher "gasPrice"

  const wei = 1000
  const nextGreeting = "Greeting again"

  const lastBlockNumber = await ethers.provider.getBlockNumber()
  const lastBlock = await ethers.provider.getBlock(lastBlockNumber)

  const bigChainGas = lastBlock.gasLimit
  const bigFunctionGas = await greeterContract.estimateGas.setGreeting(
    nextGreeting,
    {
      value: wei,
    },
  )

  const chainGas = bigChainGas.toNumber()
  const functionGas = bigFunctionGas.toNumber()
  const gasLimit = Math.min(chainGas - 1, Math.ceil(functionGas * 1.2))

  try {
    // 1. "Idle" state
    // 2. "Pending" state until user signs it's Metamask

    // 3. "Mining" state
    const tx = await greeterContract.setGreeting(nextGreeting, {
      value: wei,
      gasLimit,
    })
    console.log("Transaction: ", tx)

    // 4. "Mined" state
    const receipt = await tx.wait()
    console.log("Receipt: ", receipt)

    // 5. "Confirmed" state after N blocks of confirmations since "lastBlock"
  } catch (error) {
    // *. "Error" state
    console.error(error)
  }

  console.log("Contract deployed to: ", greeterContract.address)
  console.log("Contract deployed by: ", owner.address)

  const lastGreeting = await greeterContract.greet()
  console.log("Last greeting is: ", lastGreeting)
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
