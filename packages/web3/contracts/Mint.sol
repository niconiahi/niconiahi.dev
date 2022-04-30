// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Mint is ERC721Enumerable, Ownable {
  using SafeMath for uint256;

  constructor() ERC721("Erc721PayPerMint", "MINT") {}

  function exists(uint256 tokenId) public view returns (bool) {
   return _exists(tokenId);
  }

  function mint(address to, uint256 tokenId) public payable returns (bool) {
    require(msg.value >= tokenId.mul(1e12), "Insufficient payment"); 

    _mint(to, tokenId);
    return true;
  }

  function withdraw() public onlyOwner {
    payable(msg.sender).transfer(address(this).balance);
  }
}