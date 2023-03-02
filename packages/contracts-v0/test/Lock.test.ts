import { expect } from 'chai';
import { ethers, } from 'hardhat';
import { BigNumber, ContractFactory, Contract, Signer } from 'ethers';
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/src/signers"
import {
    ONE_GWEI,
    ONE_YEAR_IN_SECS,
    UNLOCK_TIME_SHOULD_BE_FUTURE,
    YOU_CANT_WITHDRAW_YET, 
    YOU_ARENT_THE_OWNER,
} from '../utils/constants';

describe('Lock Contract', function () {
    let contract: ContractFactory;
    let lock: Contract;
    let unlockTime: number;
    let lockedAmount: BigNumber | number;
    let signers: SignerWithAddress[] | Signer[];
    let owner: SignerWithAddress | Signer;
    let otherAccount: SignerWithAddress | Signer;

    // NOTE: Before all tests, deploy the contract and get the contract instance
    this.beforeAll(async () => {
        signers = await ethers.getSigners();
        owner = signers[0];
        otherAccount = signers[1];
        unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;
        lockedAmount = ONE_GWEI
        contract = await ethers.getContractFactory(
            "Lock"
        );
        lock = await contract.deploy(
            unlockTime,
            { value: lockedAmount }
        );    
    });

    describe('Deployment', function () {     
        it("Should set the right unlockTime", async function () {
            expect(await lock.unlockTime()).to.equal(unlockTime);
        });

        it("Should set the right owner", async function () {
            expect(await lock.owner()).to.equal((owner as SignerWithAddress).address);
        });

        it("Should receive and store the funds to lock", async function () {
            expect(await ethers.provider.getBalance(lock.address)).to.equal(
              lockedAmount
            );
        });
      
        it("Should fail if the unlockTime is not in the future", async function () {
            const latestTime = await time.latest();
            const Lock = await ethers.getContractFactory("Lock");
            await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
              "Unlock time should be in the future"
            );
        });    
    });

    describe("Withdrawals", function () {
        describe("Validations", function () {
          it("Should revert with the right error if called too soon", async function () {
            await expect(lock.withdraw()).to.be.revertedWith(
              "You can't withdraw yet"
            );
          });
    
          it("Should revert with the right error if called from another account", async function () {

            // We can increase the time in Hardhat Network

            await time.increaseTo(unlockTime);
            // We use lock.connect() to send a transaction from another account
            await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
              "You aren't the owner"
            );
          });
    
          it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
            let unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;
            let contract = await ethers.getContractFactory(
                "Lock"
            );
            let lock = await contract.deploy(
                unlockTime,
                { value: lockedAmount }
            );  
            await time.increaseTo(unlockTime);
    
            await expect(lock.withdraw()).not.to.be.reverted;
          });
        });
    
        describe("Events", function () {
          it("Should emit an event on withdrawals", async function () {
            let unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;
            let contract = await ethers.getContractFactory(
                "Lock"
            );
            let lock = await contract.deploy(
                unlockTime,
                { value: lockedAmount }
            );
            await time.increaseTo(unlockTime);
            await expect(lock.withdraw())
              .to.emit(lock, "Withdrawal")
              .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
          });
        });
    
        describe("Transfers", function () {
          it("Should transfer the funds to the owner", async function () {
            let unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;
            let contract = await ethers.getContractFactory(
                "Lock"
            );
            let lock = await contract.deploy(
                unlockTime,
                { value: lockedAmount }
            );
            await time.increaseTo(unlockTime);
    
            await expect(lock.withdraw()).to.changeEtherBalances(
              [owner, lock],
              [lockedAmount, -lockedAmount]
            );
          });
        });
    });
});
