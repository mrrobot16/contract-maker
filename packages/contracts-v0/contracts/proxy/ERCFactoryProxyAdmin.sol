// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";

import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

contract ERCFactoryProxyAdmin is ProxyAdmin {
    constructor() ProxyAdmin() {
        console.log("ERCFactoryProxyAdmin address: %s", address(this));
    }
}