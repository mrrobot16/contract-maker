// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";
import "./ERC20FactoryV0.sol";
import "../storage/ERCFactoryStorage.sol";

contract ERCFactoryV0 {
    // ERC20[] public erc20s;
    address private _owner;
    // NOTE: This address is of erc factory storage contract
    // address public ercFactoryStorage;
    event ERC20Created(address erc20Address);
    
    constructor() payable {}

    // function initialize(address _ercFactoryStorage) public {
    function initialize() public {
      // ercFactoryStorage = _ercFactoryStorage;
      _owner = msg.sender;
    }

    function createERC20(string memory name, string memory symbol, uint256 totalSupply) public virtual {
      ERC20FactoryV0 _erc20 = new ERC20FactoryV0(name, symbol);
      _erc20.mint(msg.sender, totalSupply);
      // ERCFactoryStorage(ercFactoryStorage).setERC20(address(_erc20));
      emit ERC20Created(address(_erc20));
    }

    function owner() public view returns (address) {
      return _owner;
    }
}