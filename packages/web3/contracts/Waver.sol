// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "hardhat/console.sol";

contract Waver {
  Wave[] internal waves;
  uint256 internal wavesCount;
  uint256 private seed;
  mapping (address => uint256) public lastWavedAt;

  event NewWave(address indexed from, uint256 timestamp, string message);

  struct Wave {
    address waver;
    string message;
    uint256 timestamp;
  }


  constructor() payable {
    console.log("Yo yo, I am a contract and I am smart");

    seed = (block.timestamp + block.difficulty) & 100;
  }

  function wave(string memory _message) public {
    require(
      lastWavedAt[msg.sender] + 10 seconds < block.timestamp, 
      "Wait 10 seconds"
    );

    lastWavedAt[msg.sender] = block.timestamp;
    
    wavesCount += 1;
    console.log("%s waved w/ message %s", msg.sender, _message);

    waves.push(Wave(msg.sender, _message, block.timestamp));

    seed = (block.difficulty + block.timestamp + seed) % 100;

    console.log("Random # generated: %d", seed);

    if (seed <= 50) {
      console.log("%s won!", msg.sender);

      uint256 prizeAmount = 0.0001 ether;

      console.log("%s balance", address(this).balance);

      require(
        prizeAmount < address(this).balance,
        "No more money to give away"
      );
 
      payable(msg.sender).transfer(prizeAmount);
    }

   emit NewWave(msg.sender, block.timestamp, _message);
  }

  function getWaves() public view returns (Wave[] memory) {
    return waves;
  }

  function getWavesCount() public view returns (uint256) {
    console.log("We have %d total waves!", wavesCount);
    return wavesCount;
  }
}