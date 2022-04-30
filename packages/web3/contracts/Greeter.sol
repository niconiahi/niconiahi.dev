// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1; 

contract Greeter {
  string private greeting;

  event GreetingSet(string greeting, uint256 balance);

  constructor(string memory _greeting) {
    greeting = _greeting;

    emit GreetingSet(_greeting, 0);
  }

  function greet() public view returns (string memory) {
    return greeting;
  }
  
  function setGreeting(string memory _greeting) public payable returns (string memory, uint256) {
    require(msg.value >= 1000, "Send at least 1 kWei");
    greeting = _greeting;
    emit GreetingSet(_greeting, address(this).balance);

    return (_greeting, address(this).balance);
  }
}