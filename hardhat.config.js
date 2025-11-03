
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      forking: {
        url: process.env.BSC_RPC_URL || "",
        blockNumber: undefined
      }
    }
  }
};
