import { expect } from 'chai';
import { ethers, } from 'hardhat';
import { BigNumber, ContractFactory, Contract, Signer } from 'ethers';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/src/signers";

import erc20Factory from '../artifacts/contracts/ERC20FactoryV0.sol/ERC20FactoryV0.json';

describe('ERCFactoryV0 Contract', function () {
    let contract: ContractFactory;
    let ercFactory: Contract;
    let address: string;
    let signers: SignerWithAddress[] | Signer[];
    let owner: SignerWithAddress | Signer;
    let erc20Tokens: any[];
    let erc20Token: any

    // NOTE: Before all tests, deploy the contract and get the contract instance
    this.beforeAll(async () => {
        signers = await ethers.getSigners();
        owner = signers[0];
        contract = await ethers.getContractFactory(
            "ERCFactoryV0"
        );
        ercFactory = await contract.deploy({value: ethers.utils.parseEther("0.00012345")});    
        await ercFactory.deployed();
        address = ercFactory.address
        ercFactory.initialize();
        ercFactory.createERC20("TestFactoryTokenV0", "TFT", ethers.utils.parseEther(".0000067890"));
    });

    describe('Deployment', function () {     
        it("Should set the right owner", async function () {
            expect(await ercFactory.owner()).to.equal((owner as SignerWithAddress).address);
        }); 

        it("Should have right address", async function () {
            expect(address).to.equal(ercFactory.address);
        });

        it("Should correct count of erc20 tokens", async function () {
            // NOTE this should return an array of erc20 token object with the address, name, symbol, etc. 
            // Instead it returns an array of string addresses
            erc20Tokens = await ercFactory.getERC20s();

            let erc20TokensCount = await ercFactory.erc20sCount();
            expect(erc20Tokens.length).to.equal(1);
            expect(erc20TokensCount).to.equal(1);
            // NOTE this should return an object with the address, name, symbol, etc. 
            // Instead it returns a addres string
            erc20Token = await ercFactory.getERC20(0);          
        });

        it("Should return correct name of erc20 token", async function () {
            const contract = await ethers.getContractAt(erc20Factory.abi, erc20Token);
            expect(await contract.name()).to.equal("TestFactoryTokenV0");          
        });
    });

});
