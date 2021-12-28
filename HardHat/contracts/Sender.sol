pragma solidity >=0.7.0 <0.9.0;

contract Sender {
    function send(address payable[] memory clients, uint256[] memory amounts) public payable{
        uint256 length = clients.length;
        require(length == amounts.length);

        for (uint256 i = 0; i < length; i++)
            clients[i].transfer(amounts[i]);
        uint bal=address(this).balance;
        payable (msg.sender).transfer(bal);
    }
}
