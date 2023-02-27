// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ERC20Factory.sol";

contract ERCFactory {
    ERC20[] public erc20s;
    ERC20Factory private _erc20;
    address private _owner;
    
    constructor() payable {}

    function initialize() public {
      console.log("Initialized ERCFactory contract");
      _owner = msg.sender;
    }

    function createERC20(string memory name, string memory symbol, uint256 totalSupply) public {
      _erc20 = new ERC20Factory(name, symbol);
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