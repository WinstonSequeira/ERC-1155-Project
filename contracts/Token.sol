pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";



contract Tokens is ERC1155{
    mapping(address => mapping(uint=>string)) public nftlist;
    constructor() public ERC1155("https://game.example/api/item/{id}.json"){

    }
    function mintCoins(uint _id, uint _amount) public {
        _mint(msg.sender, _id, _amount, "");
        
    }
    
    function mintNFT(uint _tokenId, string memory _message) public {
        _mint(msg.sender, _tokenId, 1, "");
        nftlist[msg.sender][_tokenId] = _message;
    }

    function transfer(address _to,uint _amount,uint _id) public {
        _safeTransferFrom(msg.sender, _to, _id, _amount,"");
    }
    function balance(uint _id) public view returns(uint){
        return(balanceOf(msg.sender,_id));
    }
    function getNFT(uint _tokenId) external view returns(string memory){
        return(nftlist[msg.sender][_tokenId]);
    }
}

