const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LosSantosLegend", function () {
  let legendContract;

  beforeEach(async function () {
    const LosSantosLegend = await ethers.getContractFactory("LosSantosLegend");
    legendContract = await LosSantosLegend.deploy();
  });

  it("Should create a legend with the correct name and bio", async function () {
    const legendName = "Franklin Clinton";
    const legendBio = "Started from the bottom, now we're here.";

    await legendContract.createLegend(legendName, legendBio);

    expect(await legendContract.name()).to.equal(legendName);
    expect(await legendContract.bio()).to.equal(legendBio);
  });

  it("Should start with empty name and bio", async function () {
    expect(await legendContract.name()).to.equal("");
    expect(await legendContract.bio()).to.equal("");
  });

  it("Should overwrite existing legend details", async function () {
    const initialName = "Michael De Santa";
    const initialBio = "Retired but not forgotten.";

    await legendContract.createLegend(initialName, initialBio);

    const updatedName = "Trevor Philips";
    const updatedBio = "Chaos is my middle name.";

    await legendContract.createLegend(updatedName, updatedBio);

    expect(await legendContract.name()).to.equal(updatedName);
    expect(await legendContract.bio()).to.equal(updatedBio);
  });
  
});
