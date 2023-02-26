import { ethers } from 'hardhat';

import {
    ONE_YEAR_IN_SECS,
    Network,
    ONE_GWEI,
} from '../utils/constants';

import { writeJSONFile } from '../utils/files';

async function main() {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;
    const lockDeposit = "0.0000012345"
    const lockedAmount = ethers.utils.parseEther(lockDeposit);
    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
    await lock.deployed();
    console.log(`Lock with ${lockDeposit} ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
    const filePath = `scripts/deployments/${Network}/lock.json`;
    const fileData = {
        timestamp: currentTimestampInSeconds,
        network: Network,
        address: lock.address,
        etherscan_url: `https://${Network}.etherscan.io/address/${lock.address}`,
        unlockTime,
        lockedAmount,
    };
    writeJSONFile(filePath, fileData)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
