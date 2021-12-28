pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply
    ) ERC20(_name, _symbol) {
    address receiver = 0xc6e7DF5E7b4f2A278906862b61205850344D4e7d;
        _mint(receiver, _initialSupply);
    }
}
