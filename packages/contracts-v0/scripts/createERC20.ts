import { ethers } from 'hardhat';

import {
    Network,
} from '../utils/constants';

import { writeJSONFile } from '../utils/files';
import ercFactoryV0 from './deployments/goerli/ercFactoryV0.json';
import { BigNumber } from 'ethers';

const MockERC20Token = {
    name: "TestFactoryTokenV0",
    symbol: "TFT",
    totalSupply: BigNumber.from("1000000000000000000000000"),
}

async function main() {
    const ERCFactoryV0 = await ethers.getContractAt("ERCFactoryV0", ercFactoryV0.address);
    console.log("ERCFactoryV0 contract address: ", ercFactoryV0.address);
    const erc20Factory = await ethers.getContractFactory("ERC20FactoryV0")
    const bytecode = erc20Factory.bytecode;
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
    const createERC20 = await ERCFactoryV0.createERC20(bytecode, salt, initializer, { gasLimit: 1000000 });
    const tx = await createERC20.wait();
    console.log('tx: ', tx);
    const logs = tx.logs;
    const data = logs[0].data;
    const contractAddress = "0x" + data.slice(26, data.length);
    const deployedERC20Factory = await ethers.getContractAt("ERC20FactoryV0", contractAddress);
    const isInitialized = await deployedERC20Factory.isInitialized();
    const filePath = `scripts/deployments/${Network}/createERC20.json`;
    const fileData = {
        network: Network,
        address: ercFactoryV0.address,
        etherscan_url: `https://${Network}.etherscan.io/address/${ercFactoryV0.address}`,
    };
    writeJSONFile(filePath, fileData)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
