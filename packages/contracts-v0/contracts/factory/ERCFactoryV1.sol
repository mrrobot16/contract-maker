// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";
import "./ERC20FactoryV1.sol";
import "./ERCFactoryV0.sol";

contract ERCFactoryV1 is ERCFactoryV0 {
    // ERC20[] public erc20s;
    address private _owner;
    
    constructor() payable {}

    // function initialize() public {
    //   console.log("Initialized ERCFactoryV1 contract");
    //   _owner = msg.sender;
    // }

    function createERC20(string memory name, string memory symbol, uint256 totalSupply) public virtual override {
      ERC20FactoryV1 _erc20 = new ERC20FactoryV1(name, symbol);
      _erc20.mint(msg.sender, totalSupply);
      erc20s.push(_erc20);
    }

}