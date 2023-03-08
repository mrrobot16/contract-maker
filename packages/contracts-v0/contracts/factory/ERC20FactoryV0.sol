// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract ERC20FactoryV0 is Initializable, OwnableUpgradeable, ERC20BurnableUpgradeable  {
     bool private initialized = false;

    function initialize(string memory _name, string memory _symbol) public initializer {
    // function initialize(string memory _name, string memory _symbol, uint256 _totalSupply) public initializer {
      OwnableUpgradeable.__Ownable_init();
      ERC20BurnableUpgradeable.__ERC20Burnable_init();
      ERC20Upgradeable.__ERC20_init(_name, _symbol);
      initialized = true;
    }

    function isInitialized() public view returns (bool) {
      return initialized;
    }

}


