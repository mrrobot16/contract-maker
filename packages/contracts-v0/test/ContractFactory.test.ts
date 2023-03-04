import { expect } from 'chai';
import { ethers, } from 'hardhat';
import { BigNumber, ContractFactory, Contract, Signer } from 'ethers';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/src/signers";



describe('MyContract', function () {
    let ContractFactory;
    let MyContract;
    let OtherContract: any;
    let contractFactory: any;
    let myContract: any;
    let otherContract: any;

    this.beforeAll(async () => {
        ContractFactory = await ethers.getContractFactory("ContractFactory");
        MyContract = await ethers.getContractFactory("MyContract");
        OtherContract = await ethers.getContractFactory("OtherContract");
        contractFactory = await ContractFactory.deploy();
        myContract = await MyContract.deploy();
    });
 
    it("Should deploy storage contract correctly", async function () {
        const bytecode = OtherContract.bytecode;
        const salt = ethers.utils.randomBytes(32);

        await myContract.deployOtherContract(bytecode, salt);

        const deployedAddress = await contractFactory.deployContract(bytecode, salt);
        const tx = await deployedAddress.wait()
        // console.log('tx', tx);
        
        // console.log('deployedAddress', await deployedAddress.wait());
        
        otherContract = await OtherContract.attach(tx.to);
        // await otherContract.wait();
        console.log('otherContract', await otherContract.callStatic.initialized());
        // console.log('otherContract', await otherContract.initialized());
        // expect(await otherContract.initialized()).to.be.true;
    }); 
});
