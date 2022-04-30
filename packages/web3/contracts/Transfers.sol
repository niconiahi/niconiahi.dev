// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Transfers is ERC20 {
    constructor(uint256 initialSupply) ERC20("Erc20", "ERC20") {
        _mint(msg.sender, initialSupply);
    }
}