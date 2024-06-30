// const { ethers } = require("hardhat");
// const { expect } = require("chai");
// const fs = require("fs");
// const path = require("path");

// async function runTests(solCode) {
//   const results = [];

//   // Create a temporary directory for the project
//   const tempDir = path.join(__dirname, "temp");
//   if (!fs.existsSync(tempDir)) {
//     fs.mkdirSync(tempDir);
//   }

//   // Save the Solidity code to a file
//   const contractPath = path.join(tempDir, "HelloHedera.sol");
//   fs.writeFileSync(contractPath, solCode);

//   // Set Hardhat config to use the temp directory
//   const hardhatConfig = `
//     require("@nomicfoundation/hardhat-toolbox");

//     module.exports = {
//       solidity: "0.8.0",
//       paths: {
//         sources: "${tempDir}",
//       },
//     };
//   `;
//   const hardhatConfigPath = path.join(tempDir, "hardhat.config.cjs");
//   fs.writeFileSync(hardhatConfigPath, hardhatConfig);

//   // Change directory to the temp directory
//   process.chdir(tempDir);

//   // Compile the contract
//   await require("hardhat").run("compile");

//   // Write tests
//   try {
//     // Create a test suite in memory
//     const HelloHedera = await ethers.getContractFactory("HelloHedera");
//     const helloHedera = await HelloHedera.deploy("Hello, Hedera!");
//     await helloHedera.deployed();

//     const initialMessage = await helloHedera.getMessage();
//     expect(initialMessage).to.equal("Hello, Hedera!");
//     results.push({ name: "Initial message test", result: "Passed" });

//     await helloHedera.setMessage("Hello, Ethereum!");
//     const newMessage = await helloHedera.getMessage();
//     expect(newMessage).to.equal("Hello, Ethereum!");
//     results.push({ name: "Update message test", result: "Passed" });
//   } catch (error) {
//     results.push({ name: "Test", result: `Failed: ${error.message}` });
//   }

//   return results;
// }

// module.exports = { runTests };


const { ethers } = require("hardhat");
const { expect } = require("chai");
const fs = require("fs");
const path = require("path");

async function runTests(solCode) {
  const results = [];

  // Create a temporary directory for the project
  const tempDir = path.join(__dirname, "temp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  // Save the Solidity code to a file
  const contractPath = path.join(tempDir, "HelloHedera.sol");
  fs.writeFileSync(contractPath, solCode);

  // Create a minimal Hardhat config
  const hardhatConfig = `
    require("@nomicfoundation/hardhat-toolbox");

    module.exports = {
      solidity: "0.8.0",
      paths: {
        sources: "${tempDir}",
      },
    };
  `;
  const hardhatConfigPath = path.join(tempDir, "hardhat.config.cjs");
  fs.writeFileSync(hardhatConfigPath, hardhatConfig);

  // Create a minimal package.json
  const packageJson = {
    name: "temp-hardhat-project",
    version: "1.0.0",
    private: true,
    devDependencies: {
      "@nomicfoundation/hardhat-toolbox": "^5.0.0",
      "chai": "^5.1.1",
      "ethers": "^6.13.0",
      "hardhat": "^2.22.5"
    }
  };
  const packageJsonPath = path.join(tempDir, "package.json");
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // Change directory to the temp directory
  process.chdir(tempDir);

  // Install the dependencies
  const { execSync } = require("child_process");
  execSync("npm install", { stdio: "inherit" });

  // Compile the contract
  await require("hardhat").run("compile");

  // Write tests
  try {
    // Create a test suite in memory
    const HelloHedera = await ethers.getContractFactory("HelloHedera");
    const helloHedera = await HelloHedera.deploy("Hello, Hedera!");
    await helloHedera.deployed();

    // Test case for getMessage function
    it("getMessage function should return the initial message", async () => {
      const initialMessage = await helloHedera.getMessage();
      expect(initialMessage).to.equal("Hello, Hedera!");
    });

    // Test case for setMessage function
    it("setMessage function should set a new message", async () => {
      await helloHedera.setMessage("Hello, Ethereum!");
      const newMessage = await helloHedera.getMessage();
      expect(newMessage).to.equal("Hello, Ethereum!");
    });

  } catch (error) {
    results.push({ name: "Test", result: `Failed: ${error.message}` });
  }

  return results;
}

module.exports = { runTests };

