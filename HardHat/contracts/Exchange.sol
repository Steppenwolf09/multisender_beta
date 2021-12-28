pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Exchange {
    address public tokenAddress;

    constructor(address _token) {
        require(_token != address(0), "invalid token address");

        tokenAddress = _token;
    }
    
    function getReserve() public view returns (uint256) {
        return IERC20(tokenAddress).balanceOf(address(this));
    }
    
    function getAmount(uint256 inputAmount) public view returns (uint256){
    	if (address(this).balance >= 20 ** 18){
        	return (inputAmount * 70000);
    	}
    	else{
    		return (inputAmount * 10000);
    	}
    }
    
    function ethToTokenSwap(uint256 _minTokens) public payable {
        uint256 tokensBought = getAmount(msg.value);
        require(tokensBought >= _minTokens, "insufficient amount");
        IERC20(tokenAddress).transfer(msg.sender, tokensBought);
    }
    function transfer(address receiver, uint256 amount) public payable{
    	if (getReserve() == 0){
    		IERC20(tokenAddress).transferFrom(msg.sender, 		receiver,amount);
	}
    }     
    
}
