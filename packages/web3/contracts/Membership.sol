// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Membership is ERC1155 {
    uint256 public constant MEMBERSHIP = 0;

    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        _mint(msg.sender, MEMBERSHIP, 10**9, "");
    }
}