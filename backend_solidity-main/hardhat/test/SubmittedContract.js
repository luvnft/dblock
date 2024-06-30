
    const { expect } = require("chai");

    describe("SubmittedContract", function () {
      let SubmittedContract;
      let submittedContract;
      let owner;

      beforeEach(async function () {
        SubmittedContract = await ethers.getContractFactory("SubmittedContract");
        [owner] = await ethers.getSigners();
        submittedContract = await SubmittedContract.deploy("Initial Message");
        await submittedContract.waitForDeployment();
      });

      it("Should deploy with the correct initial message", async function () {
        expect(await submittedContract.getMessage()).to.equal("Initial Message");
      });

      it("Should update the message when setMessage is called", async function () {
        const newMessage = "New Message";
        await submittedContract.setMessage(newMessage);
        expect(await submittedContract.getMessage()).to.equal(newMessage);
      });

      it("Should return the correct message after multiple updates", async function () {
        const firstMessage = "First Message";
        const secondMessage = "Second Message";

        await submittedContract.setMessage(firstMessage);
        expect(await submittedContract.getMessage()).to.equal(firstMessage);

        await submittedContract.setMessage(secondMessage);
        expect(await submittedContract.getMessage()).to.equal(secondMessage);
      });
    });
  