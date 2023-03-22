import { ethers } from 'hardhat';
import { BigNumber } from 'ethers';

async function main() {
    const ERCFactoryV0 = await ethers.getContractFactory("ERCFactoryV0GasTester");
    const ercFactoryV0 = await ERCFactoryV0.deploy();
    console.log("Object.keys(ercFactoryV0).estimateGas", Object.keys(ercFactoryV0.estimateGas));
    const createERC20Gas = await ercFactoryV0.estimateGas.createERC20("Test", "TST", BigNumber.from("1000000000000000000000000"));
    console.log("createERC20Gas", createERC20Gas);
    
    // await ercFactoryV0.deployed();
    // console.log(`ERCFactoryV0 deployed to ${ercFactoryV0.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
