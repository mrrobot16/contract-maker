// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";
import "./ERC20FactoryV0.sol";
// import "../storage/ERCFactoryStorage.sol";

contract ERCFactoryV0 {
    address private _owner;
    bool private initialized = false;
    event ERC20Created(address erc20Address);

    function initialize() public {
      _owner = msg.sender;
      initialized = true;
    }

    function createERC20(bytes memory erc20, bytes32 salt, bytes memory initializer) public virtual {
        (string memory _name, string memory _symbol, uint256 _totalSupply) = abi.decode(initializer, (string, string, uint256));
        bytes memory constructorArgs = abi.encodeWithSignature("constructor(string memory name, string memory symbol) ERC20(name, symbol)", _name, _symbol);
        bytes memory deploymentData = abi.encodePacked(erc20, constructorArgs);
        console.log("     createERC20 _name: ", _name);
        console.log("     createERC20 _symbol: ", _symbol);
        console.log("     createERC20 _totalSupply: ", _totalSupply);
        // console.log("     createERC20 deploymentData: ", deploymentData);
        
        address _erc20;
        assembly {
          //  _erc20 := create2(0, add(erc20, 0x20), mload(erc20), salt)
           _erc20 := create2(0, add(deploymentData, 0x20), mload(deploymentData), salt)
            if iszero(extcodesize(_erc20)) {
                revert(0, 0)
            }
        }
        console.log("     createERC20 contract address: ", _erc20);
        emit ERC20Created(_erc20);
    }

    function owner() public view returns (address) {
      return _owner;
    }
}