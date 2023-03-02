// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";
import "./ERC20FactoryV0.sol";

contract ERCFactoryV0 {
    ERC20[] public erc20s;
    address private _owner;
    
    constructor() payable {}

    function initialize() public {
      console.log("Initialized ERCFactory contract");
      _owner = msg.sender;
    }

    function createERC20(string memory name, string memory symbol, uint256 totalSupply) public virtual {
      ERC20FactoryV0 _erc20 = new ERC20FactoryV0(name, symbol);
      _erc20.mint(msg.sender, totalSupply);
      erc20s.push(_erc20);
    }

    function owner() public view returns (address) {
      return _owner;
    }

    function erc20sCount() public view returns (uint256) {
      return erc20s.length;
    }

    function getERC20s() public view returns (ERC20[] memory) {
      return erc20s;
    }
  
    // NOTE: returns ERC20 address, but should return a ERC20 object
    function getERC20(uint index) public view returns (ERC20) { 
      return ERC20(address(erc20s[index]));
    }
}