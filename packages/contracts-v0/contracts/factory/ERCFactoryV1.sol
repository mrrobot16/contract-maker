// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";
import "./ERC20FactoryV0.sol";
// NOTE: In the future this contract might used for now there we continue using ERC20FactoryV0.
// import "./ERC20FactoryV1.sol" 
import "./ERCFactoryV0.sol";
import "../storage/ERCFactoryStorage.sol";
contract ERCFactoryV1 is ERCFactoryV0 {
    address private _owner;

    constructor() payable {}

    // function initialize() public {
    //   console.log("Initialized ERCFactoryV1 contract");
    //   _owner = msg.sender;
    // }

    function createERC20(string memory name, string memory symbol, uint256 totalSupply) public virtual {
      // ERC20FactoryV0 _erc20 = new ERC20FactoryV0(name, symbol, totalSupply);
      console.log("something new in createERC20 ERCFactoryV1");
      console.log("name: s%", name);
      console.log("symbol: s%", symbol);
      console.log("totalSupply: s%", totalSupply);
      // _erc20.mint(msg.sender, totalSupply);
      // ERCFactoryStorage(ercFactoryStorage).setERC20(address(_erc20));
    }

}