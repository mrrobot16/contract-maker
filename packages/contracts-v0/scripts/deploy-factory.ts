import { ethers } from 'hardhat';

import {
    Network,
} from '../utils/constants';

import { writeJSONFile } from '../utils/files';

async function main() {
    const ERCFactoryV0 = await ethers.getContractFactory("ERCFactoryV0");
    const ercFactoryV0 = await ERCFactoryV0.deploy({ gasLimit: 1000000});
    // console.log("ERCFactoryV0 deployed to:", ercFactoryV0);
    await ercFactoryV0.deployed();
    console.log(`ERCFactoryV0 deployed to ${ercFactoryV0.address}`);
    const filePath = `scripts/deployments/${Network}/ercFactoryV0.json`;
    const fileData = {
        // timestamp: currentTimestampInSeconds,
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
