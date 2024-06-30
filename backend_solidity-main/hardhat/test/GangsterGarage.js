const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GangsterGarage", function () {
  let garage;

  beforeEach(async function () {
    const GangsterGarage = await ethers.getContractFactory("GangsterGarage");
    garage = await GangsterGarage.deploy();
    await garage.waitForDeployment();
  });

  it("Should add a car and return the correct count", async function () {
    await garage.addCar("Cadillac Coupe DeVille");
    expect(await garage.getCarCount()).to.equal(1);

    await garage.addCar("Lincoln Continental");
    expect(await garage.getCarCount()).to.equal(2);
  });

  it("Should return 0 for an empty garage", async function () {
    expect(await garage.getCarCount()).to.equal(0);
  });

  it("Should store and retrieve car names correctly", async function () {
    const carsToAdd = ["Cadillac Coupe DeVille", "Lincoln Continental", "Buick Riviera"];

    for (let i = 0; i < carsToAdd.length; i++) {
      await garage.addCar(carsToAdd[i]);
    }

    expect(await garage.getCarCount()).to.equal(carsToAdd.length);

    for (let i = 0; i < carsToAdd.length; i++) {
      expect(await garage.cars(i)).to.equal(carsToAdd[i]);
    }
  });

  it("Should handle adding a large number of cars", async function () {
    const numCars = 100;

    for (let i = 0; i < numCars; i++) {
      await garage.addCar(`Car ${i + 1}`); 
    }

    expect(await garage.getCarCount()).to.equal(numCars);
  });
});