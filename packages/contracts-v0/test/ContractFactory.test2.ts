import { expect } from 'chai';
import { ethers, } from 'hardhat';
import { BigNumber, ContractFactory, Contract, Signer } from 'ethers';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/src/signers";



describe('MyContract', function () {
    let ContractFactory;
    let ContractFactoryDeployed: any;
    let MyContract: any;

    this.beforeAll(async () => {
        ContractFactory = await ethers.getContractFactory("ContractFactory");
        ContractFactoryDeployed = await ContractFactory.deploy();
        MyContract = await ethers.getContractFactory("MyContract");
    });
 
    it("Should deploy contract correctly", async function () {
        const bytecode = MyContract.bytecode;
        const salt = ethers.utils.randomBytes(32);
        const deployContract = await ContractFactoryDeployed.deployContract(bytecode, salt);
        const tx = await deployContract.wait();
        // console.log("tx.logs", tx.logs[0]);
        const data = tx.logs[0].data;
        const contractAddress = "0x" + data.slice(26, data.length);
        console.log("Deployed Contract address: ", contractAddress);
        const deployedContract = await ethers.getContractAt("MyContract", contractAddress);
        console.log("deployedContract", Object.keys(deployedContract));
        
    }); 
});
