require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require("hardhat-contract-sizer");

import "./tasks/modular-test";

const SEPOLIA_PRIVATE_KEY = "SEPOLIA_PRIVATE_KEY";
const SEPOLIA_ALCHEMY_KEY = "SEPOLIA_ALCHEMY_KEY";
const ETHERSCAN_KEY = "ETHERSCAN_KEY";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    hardhat: {
      blockGasLimit: 100_000_000,
    },
    // sepolia: {
    //   url: `https://eth-sepolia.g.alchemy.com/v2/${SEPOLIA_ALCHEMY_KEY}`,
    //   accounts: [SEPOLIA_PRIVATE_KEY]
    // },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    scroll: {
      url: "https://sepolia-rpc.scroll.io",
      accounts: [
        "77cfdbcc67c82e18af4e9ce2c33c0b938989b23b9bb643d90af6d68a392e36a9", //"77cfdbcc67c82e18af4e9ce2c33c0b938989b23b9bb643d90af6d68a392e36a9" // zkhack2,
      ],
    },
    mantle: {
      url: "https://rpc.testnet.mantle.xyz/",
      accounts: [
        "43fa8c79d37c502cba58057e33a7700b7172c1672e35225cd55144e623fbf759", // zkhack
      ],
    },
  },
  etherscan: {
    apiKey: {
      mantle: "mantle", // apiKey is not required, just set a placeholder
    },
    customChains: [
      {
        network: "mantle",
        chainId: 5000,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/mainnet/evm/5000/etherscan",
          browserURL: "https://mantlescan.info",
        },
      },
    ],
  },
  allowUnlimitedContractSize: true,
};
