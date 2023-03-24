import { expect } from 'chai';
import { ethers, } from 'hardhat';
import { BigNumber, ContractFactory, Contract, Signer } from 'ethers';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/src/signers";

import erc20FactoryV0 from '../artifacts/contracts/factory/ERC20FactoryV0GasTester.sol/ERC20FactoryV0GasTester.json';

const MockERC20Token = {
    name: "TestFactoryTokenV0",
    symbol: "TFT",
    totalSupply: BigNumber.from("1000000000000000000000000"),
}

describe('ERCFactoryV0GasTester Contract', function () {
    let signers: SignerWithAddress[] | Signer[];
    let owner: SignerWithAddress | Signer;

    let contract: ContractFactory;
    let ercFactoryGasTester: Contract;

    let erc20FactoryGasTester: ContractFactory;
    let erc20: Contract;
    // let erc20Factory: Contract;

    let address: string;

    let erc20Tokens: any[];
    let erc20Token: any;
    let erc20TokenTotalSupply: BigNumber;

    // NOTE: Before all tests, deploy the contract and get the contract instance
    this.beforeAll(async () => {
        signers = await ethers.getSigners();
        owner = signers[0];

        contract = await ethers.getContractFactory(
            "ERCFactoryV0GasTester"
        );
        // erc20FactoryGasTester = await ethers.getContractFactory("ERC20FactoryV0GasTester");
        // erc20 = await erc20FactoryGasTester.deploy();
        ercFactoryGasTester = await contract.deploy();    
        await ercFactoryGasTester.initialize();
        address = ercFactoryGasTester.address;
    });

    describe.skip('Deployment ERCFactoryGasTester', function () {     
        it("Should set the right owner", async function () {
            expect(await ercFactoryGasTester.owner()).to.equal((owner as SignerWithAddress).address);
        }); 

        it("Should have right address", async function () {
            expect(address).to.equal(ercFactoryGasTester.address);
        });

        it("Should create ERC20GasTester token", async function () {
            const bytecode = erc20FactoryGasTester.bytecode;
            const salt = ethers.utils.randomBytes(32);
            const { name, symbol, totalSupply } = MockERC20Token;
            const paramsTypes = [
                "string", 
                "string", 
                "uint256"
            ];
            const paramsInitiliazer = [
                name, 
                symbol, 
                totalSupply
            ];
            const initializer = ethers.utils.defaultAbiCoder.encode(paramsTypes, paramsInitiliazer);
            // const createERC20 = await ercFactory.createERC20(erc20.address, salt, initializer);
            const createERC20 = await ercFactoryGasTester.createERC20(bytecode, salt, initializer);            
            const tx = await createERC20.wait();
            const logs = tx.logs;
            const contractAddress = logs[0].address;
            erc20Token = await ethers.getContractAt("ERC20FactoryV0", contractAddress);
            const isInitialized = await erc20Token.isInitialized();
            expect(erc20Token.address).to.equal(contractAddress);
            expect(isInitialized).to.equal(true);
        });
    });

});
