// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";
import "./ERC20FactoryV0.sol";
// import "../storage/ERCFactoryStorage.sol";

contract ERCFactoryV0 {
    address private _owner;
    event ERC20Created(address erc20Address);

    function initialize() public {
      _owner = msg.sender;
    }

    // function createERC20(bytes memory erc20, bytes32 salt) public virtual {
    function createERC20(bytes memory erc20, bytes32 salt, bytes memory initializer) public virtual {
        // NOTE: string name, string symbol & totalSupply will be passed in as bytes 
        // which will be decoded in the ERC20FactoryV0 contract
        address _erc20;
        assembly {
           _erc20 := create2(0, add(erc20, 0x20), mload(erc20), salt)
            if iszero(extcodesize(_erc20)) {
                revert(0, 0)
            }
        }
        // console.log("createERC20 Deployed Contract address: ", _erc20);
        emit ERC20Created(_erc20);
    }

    function owner() public view returns (address) {
      return _owner;
    }
}