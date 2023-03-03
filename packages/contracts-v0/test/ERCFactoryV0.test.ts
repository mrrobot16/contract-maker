import { expect } from 'chai';
import { ethers, } from 'hardhat';
import { BigNumber, ContractFactory, Contract, Signer } from 'ethers';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/src/signers";

import erc20FactoryV0 from '../artifacts/contracts/factory/ERC20FactoryV0.sol/ERC20FactoryV0.json';

describe('ERCFactoryV0 Contract', function () {
    let signers: SignerWithAddress[] | Signer[];
    let owner: SignerWithAddress | Signer;
    
    let storage: ContractFactory;
    let ercStorage: Contract;

    let contract: ContractFactory;
    let ercFactory: Contract;

    let address: string;
    let ercStorageAddress: string;

    let erc20Tokens: any[];
    let erc20Token: any;

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

        storage = await ethers.getContractFactory(
          "ERCFactoryStorage"
        );
        ercStorage = await storage.deploy();
        await ercStorage.deployed();
        ercStorageAddress = ercStorage.address;

        contract = await ethers.getContractFactory(
            "ERCFactoryV0"
        );
        ercFactory = await contract.deploy({value: ethers.utils.parseEther("0.00012345")});    
        await ercFactory.deployed();
        await ercFactory.initialize(ercStorageAddress);
        address = ercFactory.address

    });

    describe('Deployment ERCFactoryStorage', function () {     
        it("Should deploy storage contract correctly", async function () {
            expect(typeof ercStorageAddress).to.equal("string");
            expect(ercStorageAddress.slice(0, 2)).to.equal("0x");
        }); 

        it("Should have correct count of ERC20s in storage", async function () {
            expect(await ercStorage.erc20sCount()).to.equal(0);
        });
        it("Should correct count of erc20 tokens upon storage deployment", async function () {
            erc20Tokens = await ercStorage.getERC20s();
            let erc20TokensCount = await ercStorage.erc20sCount();
            expect(erc20Tokens.length).to.equal(0);
            expect(erc20TokensCount).to.equal(0);
        });
    });

    describe('Deployment ERCFactory', function () {     
        it("Should set the right owner", async function () {
            expect(await ercFactory.owner()).to.equal((owner as SignerWithAddress).address);
        }); 

        it("Should have right address", async function () {
            expect(address).to.equal(ercFactory.address);
        });

        it("Should create ERC20 token", async function () {
            await ercFactory.createERC20("TestFactoryTokenV0", "TFT", ethers.utils.parseEther(".0000067890"));
        });

        it("Should have correct count of erc20 tokens after ercFactory.createERC20()", async function () {
            erc20Tokens = await ercStorage.getERC20s();
            let erc20TokensCount = await ercStorage.erc20sCount();
            expect(erc20Tokens.length).to.equal(1);
            expect(erc20TokensCount).to.equal(1);
        });

        it("Should return correct name of erc20 token after ercFactory.createERC20()", async function () {
            erc20Token = await ercStorage.getERC20(0);    
            const contract = await ethers.getContractAt(erc20FactoryV0.abi, erc20Token);
            expect(await contract.name()).to.equal("TestFactoryTokenV0");          
        });
    });

    describe('Deployment ERCFactoryProxyAdmin', function () {
        
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

    describe('Deployment ERCFactoryProxy', function () {
        
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
