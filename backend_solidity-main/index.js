const express = require("express");
const solc = require("solc");
const cors = require("cors");
const mongoose = require("mongoose");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
// const { runTests } = require("./run-tests.js"); //to run the test cases 

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.post('/compile', (req, res) => {
  console.log("Entered compile")
  const solCode = req.body.solCode;
  
  // Compile the Solidity code
  const { bytecode, abi, errors, contract, outputData } = compileSolidityCode(solCode);

  if (errors) {
    res.status(400).json({ errors });
  } else {
    console.log("Compilation success");
    return res.json({ message: "Compilation Successful", bytecode, abi, contract, outputData });

  }
});

app.post('/submit', async (req, res) => {
  try {
      const solCode = req.body.solCode;
      // ... (code for writing contract to file)
      const contractNameMatch = solCode.match(/contract\s+(\w+)\s*\{/);
      if (!contractNameMatch) {
          throw new Error("Unable to find contract name in the Solidity code");
      }
      const contractName = contractNameMatch[1];
      console.log(contractName)
      
  // Write the submitted Solidity code to a file
      const contractPath = path.join(__dirname, `hardhat/contracts/${contractName}.sol`);
      fs.writeFileSync(contractPath, solCode);

      const testFilePath = path.join(__dirname,`hardhat/test/${contractName}.js`);
      // Compile the contract (wait for it to finish)
      console.log(testFilePath)
     const compileOutput = await new Promise((resolve, reject) => {
          exec('npx hardhat compile', { cwd: path.join(__dirname, 'hardhat') }, (error, stdout, stderr) => {
              if (error) {
                  reject(error); // Reject the Promise if compilation fails
              } else {
                  resolve(); // Resolve the Promise when compilation succeeds
              }
          });
      });

      console.log("Compilation successful!"); // Add for debugging

      
      let testOutput =""
      // Run the tests (after compilation is complete)
      if(fs.existsSync(testFilePath)){
      testOutput = await new Promise((resolve, reject) => {
          exec(`npx hardhat test ${testFilePath}`, { cwd: path.join(__dirname, 'hardhat') }, (error, stdout, stderr) => {
            if (error) {
                  reject(error,stderr);
              } else {
                  resolve(stdout);
              }
          });
      });
      console.log("Test Results: ",testOutput)
    } else{
      console.warn(`No test file found for ${contractName}`);
      testOutput = "No test cases found for this contract.";
    }
    return  res.json({ results: testOutput }).status(200);
  } catch (error) {
      console.error("Error:", error); // Log the full error object for debugging
    return  res.status(500).json({ error: error.message });
  }
});

function compileSolidityCode(solCode) {
  // Define the Solidity source code
  const input = {
    language: 'Solidity',
    sources: {
      'contract.sol': {
        content: solCode,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

  // Compile the Solidity code
  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  const outputData = JSON.stringify(output, null, 2);

  // Check for compilation errors
  if (output.errors) {
    const errors = output.errors.map(error => error.formattedMessage);
    return { errors };
  }

  // Extract and return the compiled contract bytecode and ABI
  const contractName = Object.keys(output.contracts['contract.sol'])[0];
  const bytecode = output.contracts['contract.sol'][contractName].evm.bytecode.object;
  const abi = output.contracts['contract.sol'][contractName].abi;
  const contract = output.contracts['contract.sol'][contractName];

  return { bytecode, abi, contract, outputData };
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


const uri = "mongodb+srv://anuragsidhu:test123@cluster0.qew6vsy.mongodb.net/"

mongoose.connect(uri)
.then(()=>{
  console.log("Database Connected");
})
.catch(()=>{
  console.log("not able to connect");
})

app.use(require('./routes/user-routes'));

app.use(require('./routes/problem-routes'));


