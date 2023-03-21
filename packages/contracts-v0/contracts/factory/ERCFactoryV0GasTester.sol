// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";
import "./ERC20FactoryV0GasTester.sol";
import "../storage/ERCFactoryStorage.sol";

contract ERCFactoryV0GasTester {
    ERC20FactoryV0GasTester[] public erc20s;
    address private _owner;
    
    constructor() payable {}

    function initialize() public {
      _owner = msg.sender;
    }

    function createERC20(string memory name, string memory symbol, uint256 totalSupply) public virtual {
      ERC20FactoryV0GasTester _erc20 = new ERC20FactoryV0GasTester(name, symbol);
      _erc20.mint(msg.sender, totalSupply);
    }

    function owner() public view returns (address) {
      return _owner;
    }
}