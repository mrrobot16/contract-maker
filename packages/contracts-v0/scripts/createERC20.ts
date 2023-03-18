import { ethers } from 'hardhat';
import { BigNumber } from 'ethers';

import {
    Network,
} from '../utils/constants';
import { writeJSONFile } from '../utils/files';
import ercFactoryV0 from './deployments/goerli/ercFactoryV0.json';

const MockERC20Token = {
    name: "TestFactoryTokenV0",
    symbol: "TFT",
    totalSupply: BigNumber.from("1000000000000000000000000"),
}

async function main() {
    const ERCFactoryV0 = await ethers.getContractAt("ERCFactoryV0", ercFactoryV0.address);
    console.log("ERCFactoryV0 contract address: ", ercFactoryV0.address);
    const ERC20Factory = await ethers.getContractFactory("ERC20FactoryV0");
    const erc20Factory = await ERC20Factory.deploy();
    await erc20Factory.deployed();
    const salt = ethers.utils.randomBytes(32);
    const { name, symbol, totalSupply } = MockERC20Token;
    const paramsTypes = [
        "string", 
        "string", 
        // "uint256"
    ];
    const paramsInitiliazer = [
        name, 
        symbol, 
        // totalSupply
    ];
    const initializer = ethers.utils.defaultAbiCoder.encode(paramsTypes, paramsInitiliazer);
    // NOTE: Need to check why gas is so high.
    const gasCost = await ERCFactoryV0.estimateGas.createERC20(erc20Factory.address, salt, initializer);
    const createERC20 = await ERCFactoryV0.createERC20(erc20Factory.address, salt, initializer, { gasLimit: gasCost.toNumber() });
    const tx = await createERC20.wait();
    const logs = tx.logs;
    // NOTE: In order to get the address of the deployed contract, we need to parse the logs.
    // NOTE With current event emitters, we can only get the address of the erc20 contract by parsing the last log of the transaction.
    const data = logs[logs.length - 1].data;
    const contractAddress = "0x" + data.slice(26, 26+40);
    console.log("contractAddress: ", contractAddress);
    const deployedERC20Factory = await ethers.getContractAt("ERC20FactoryV0", contractAddress);
    const isInitialized = await deployedERC20Factory.isInitialized();
    const filePath = `scripts/deployments/${Network}/createERC20.json`;
    const fileData = {
        contract: "ERC20FactoryV0",
        network: Network,
        address: contractAddress,
        etherscan_url: `https://${Network}.etherscan.io/address/${contractAddress}`,   
    };
    writeJSONFile(filePath, fileData)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
