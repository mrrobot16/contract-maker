import { expect } from 'chai';
import { ethers, } from 'hardhat';
import { BigNumber, ContractFactory, Contract, Signer } from 'ethers';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/src/signers";

import erc20FactoryV0 from '../artifacts/contracts/factory/ERC20FactoryV0.sol/ERC20FactoryV0.json';

const MockERC20Token = {
    name: "TestFactoryTokenV0",
    symbol: "TFT",
    totalSupply: BigNumber.from("1000000000000000000000000"),
}

describe('ERCFactoryV0 Contract', function () {
    let signers: SignerWithAddress[] | Signer[];
    let owner: SignerWithAddress | Signer;

    let contract: ContractFactory;
    let ercFactory: Contract;

    let erc20Factory: ContractFactory;
    let erc20: Contract;
    // let erc20Factory: Contract;

    let address: string;

    let erc20Tokens: any[];
    let erc20Token: any;
    let erc20TokenTotalSupply: BigNumber;

    let ercFactoryProxyAdmin: ContractFactory;
    let proxyAdmin: Contract;
    let proxyAdminAddress: string;

    let ercFactoryProxy: ContractFactory;
    let proxy: Contract;
    let ercFactoryProxyAddress: string;

    // NOTE: Before all tests, deploy the contract and get the contract instance
    this.beforeAll(async () => {
        signers = await ethers.getSigners();
        owner = signers[0];

        contract = await ethers.getContractFactory(
            "ERCFactoryV0"
        );
        erc20Factory = await ethers.getContractFactory("ERC20FactoryV0");
        erc20 = await erc20Factory.deploy();
        ercFactory = await contract.deploy();    
        await ercFactory.initialize();
        address = ercFactory.address;
    });

    describe('Deployment ERCFactory', function () {     
        it("Should set the right owner", async function () {
            expect(await ercFactory.owner()).to.equal((owner as SignerWithAddress).address);
        }); 

        it("Should have right address", async function () {
            expect(address).to.equal(ercFactory.address);
        });

        it("Should create ERC20 token", async function () {
            const bytecode = erc20Factory.bytecode;
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
            const createERC20 = await ercFactory.createERC20(bytecode, salt, initializer);            
            const tx = await createERC20.wait();
            const logs = tx.logs;
            const contractAddress = logs[0].address;
            erc20Token = await ethers.getContractAt("ERC20FactoryV0", contractAddress);
            const isInitialized = await erc20Token.isInitialized();
            expect(erc20Token.address).to.equal(contractAddress);
            expect(isInitialized).to.equal(true);
        });
    });

    describe.skip('Deployment ERCFactoryProxyAdmin', function () {
        
        it("Should deploy ERCFactoryProxyAdmin correctly", async function () {
            ercFactoryProxyAdmin = await ethers.getContractFactory(
                "ERCFactoryProxyAdmin"
            );
            proxyAdmin = await ercFactoryProxyAdmin.deploy();
            await proxyAdmin.deployed();
            proxyAdminAddress = proxyAdmin.address;
            expect(typeof proxyAdminAddress).to.equal("string");
            expect(proxyAdminAddress.slice(0, 2)).to.equal("0x");
        }); 
    });

    describe.skip('Deployment ERCFactoryProxy', function () {
        
        it("Should deploy ERCFactoryProxy correctly", async function () {
            ercFactoryProxy = await ethers.getContractFactory(
                "ERCFactoryProxy"
            );
            proxyAdmin = await ercFactoryProxyAdmin.deploy();
            await proxyAdmin.deployed();
            proxyAdminAddress = proxyAdmin.address;
            expect(typeof proxyAdminAddress).to.equal("string");
            expect(proxyAdminAddress.slice(0, 2)).to.equal("0x");
        }); 
    });


});
