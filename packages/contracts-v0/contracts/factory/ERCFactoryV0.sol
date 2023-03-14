// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";
import "./ERC20FactoryV0.sol";
// import "../storage/ERCFactoryStorage.sol";

contract ERCFactoryV0 {
    address private _owner;
    bool private initialized = false;
    event ERC20Created(address erc20Address, address owner);

    function initialize() public {
      _owner = msg.sender;
      initialized = true;
    }

function createERC20(address _singleton, bytes32 salt, bytes memory initializer) public {  
// function createERC20(bytes memory bytecode, bytes32 salt, bytes memory initializer) public {
      (string memory _name, string memory _symbol) = abi.decode(initializer, (string, string));
      // (string memory _name, string memory _symbol, uint256 _totalSupply) = abi.decode(initializer, (string, string, uint256));
      bytes memory bytecode = abi.encodePacked(type(ERC20FactoryV0).creationCode, uint256(uint160(_singleton)));
      address _erc20;
      assembly {
        _erc20 := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
        if iszero(extcodesize(_erc20)) {
          revert(0, 0)
        }
      }
      // console.log("ERC20 address: ", _erc20);
      ERC20FactoryV0(_erc20).initialize(_name, _symbol);
      // ERC20FactoryV0(_erc20).initialize(_name, _symbol, _totalSupply);
      emit ERC20Created(_erc20, msg.sender);
    }

    function owner() public view returns (address) {
      return _owner;
    }
}