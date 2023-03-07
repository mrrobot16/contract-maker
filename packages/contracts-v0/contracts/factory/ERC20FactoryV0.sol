// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// contract ERC20FactoryV0 is ERC20 {
contract ERC20FactoryV0 {

     bool private initialized = false;

    function initialize() public { // NOTE: this function can only be called once
      console.log("ERC20FactoryV0 initialize called");
      initialized = true;
    }

    function isInitialized() public view returns (bool) {
      return initialized;
    }

}