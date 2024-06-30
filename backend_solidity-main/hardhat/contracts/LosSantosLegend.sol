// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LosSantosLegend {
    string public name;
    string public bio;

    function createLegend(string memory _name, string memory _bio) public {
        name = _name;
        bio = _bio;
    }
}
