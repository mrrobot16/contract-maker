// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";

// NOTE: This contract will be our storage contracts deployed by the factory. 
// NOTE: It will only store the addresses of the all contracts deployed by the factory.

contract ERCFactoryStorageV0 {
    address[] public erc20s;
    constructor() {
        console.log("ERCFactoryStorage constructor with address: %s", address(this));
    }

    function setERC20s(address erc20) external {
      erc20s.push(erc20);
    }

    function erc20sCount() external view returns (uint256) {
      return erc20s.length;
    }

    function getERC20s() external view returns (address[] memory) {
      return erc20s;
    }

}