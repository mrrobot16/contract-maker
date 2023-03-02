// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20FactoryV1 is ERC20 {

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}
  
    function mint(address account, uint256 amount) public {
      console.log("ERC20V1Factory mint for account %s and amount of %s", account, amount);
      _mint(account, amount);
    }

    function mintV1(address account, uint256 amount) public {
      console.log("ERC20V1Factory mintV1 for account %s and amount of %s", account, amount);
      _mint(account, amount);
    }

}