import * as dotenv from "dotenv"

import { HardhatUserConfig } from "hardhat/config"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-waffle"
import "@typechain/hardhat"
import "hardhat-gas-reporter"
import "solidity-coverage"

dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.1",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: process.env.RIN_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
    mainnet: {
      chainId: 1,
      url: process.env.ETH_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
}

export default config
