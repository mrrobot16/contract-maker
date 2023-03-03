// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// NOTE: This contract will be our storage contracts deployed by the factory. 
// NOTE: It will only store the addresses of the all contracts deployed by the factory.

contract ERCFactoryStorage {
    address[] public erc20s;

    function setERC20(address _erc20) external {
      erc20s.push(_erc20);
    }

    function erc20sCount() external view returns (uint256) {
      return erc20s.length;
    }

    function getERC20s() external view returns (address[] memory) {
      return erc20s;
    }

    // NOTE: returns ERC20 address, but should return a ERC20 object
    function getERC20(uint index) public view returns (ERC20) { 
      return ERC20(erc20s[index]);
    }

}