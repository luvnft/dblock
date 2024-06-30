// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.24",
// };


require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24", // Keep your Solidity version

  defaultNetwork: "hardhat", // Use the Hardhat Network by default

  networks: {
    hardhat: {
      chainId: 31337, // If you are using Hardhat Network 
    },
    // You can add other networks here (e.g., localhost, testnets, mainnet)
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./_hardhat_contracts", 
  },

  mocha: {
    timeout: 20000, // Increase timeout if your tests take longer
  },
};
