// // hardhat/test/GTAIntro.js
const { expect } = require("chai");

describe("GTAIntro", function () {
  let gtaIntro;

  before(async function () {
    const GTAIntro = await hre.ethers.getContractFactory("GTAIntro"); // Use hre to access ethers
    gtaIntro = await GTAIntro.deploy();
  });

  it("Should return the correct dialogue", async function () {
    const expectedDialogue = "You Forget A Thousand Things Every Day, Pal. Make Sure This Is One Of Em.";
    const result = await gtaIntro.getDialogue();
    expect(result).to.equal(expectedDialogue);
  });
});
