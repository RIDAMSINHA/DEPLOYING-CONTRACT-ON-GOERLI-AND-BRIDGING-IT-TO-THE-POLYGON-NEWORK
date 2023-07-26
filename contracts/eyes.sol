// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract eyes is ERC721Enumerable, Ownable {
    struct NFTMetadata {
        string name;
        string description;
        string image;
    }

    NFTMetadata[] public nfts;
    uint256 public maxQuantity = 5;
    uint256 public currentTokenId = 0;

    constructor() ERC721("MyNFTCollection", "MNC") {
        nfts.push(NFTMetadata('0', 'Many Beautiful Eyes', 'QmbyZK9kVchUGSKp8jGM6rFZBX1E1upWtuGQR4o2Cg99zh'));
        nfts.push(NFTMetadata('1', 'Many Beautiful Eyes', 'QmbyZK9kVchUGSKp8jGM6rFZBX1E1upWtuGQR4o2Cg99zh'));
        nfts.push(NFTMetadata('2', 'Many Beautiful Eyes', 'QmbyZK9kVchUGSKp8jGM6rFZBX1E1upWtuGQR4o2Cg99zh'));
        nfts.push(NFTMetadata('3', 'Many Beautiful Eyes', 'QmbyZK9kVchUGSKp8jGM6rFZBX1E1upWtuGQR4o2Cg99zh'));
        nfts.push(NFTMetadata('4', 'Many Beautiful Eyes', 'QmbyZK9kVchUGSKp8jGM6rFZBX1E1upWtuGQR4o2Cg99zh'));
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://gateway.ipfs.io/ipfs/";
    }

    // Returns the prompt used to generate the images for the given NFT tokenId
    function promptDescription(uint256 tokenId) external view returns (string memory) {
        require(tokenId < nfts.length, "TokenId does not exist");
        return nfts[tokenId].description;
    }

    function mintNFT(uint256 quantity) external onlyOwner {
        require(currentTokenId + quantity <= maxQuantity, "Exceeds maximum token limit");
        for (uint256 i = 0; i < quantity; i++) {
            _mint(msg.sender, currentTokenId);
            currentTokenId++;
        }
    }
}

contract FxPortalBridge {
    event Deposit(address indexed from, address indexed to, uint256 tokenId, string data);

    function deposit(string calldata data, address to, uint256 tokenId) external {

        emit Deposit(msg.sender, to, tokenId, data);
    }
}