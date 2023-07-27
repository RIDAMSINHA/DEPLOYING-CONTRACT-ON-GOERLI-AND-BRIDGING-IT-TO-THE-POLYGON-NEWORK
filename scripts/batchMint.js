const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/eyes.sol/eyes.json");
require('dotenv').config()

const tokenAddress = "0x6c13b8EeBb863b78e0128224536473BB40089f4E"; // place your erc721 contract address here
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0xE6c82A490314A404E4b2976cc26dA0Aa2F089902"; // place your public address for your wallet here

async function main() {

    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);
  
    const tx = await token.mintNFT(5);
    await tx.wait();

    console.log("You now have: " + await token.balanceOf(walletAddress) + " NFT");
  }
  
  // This pattern is recommanded to be able to use async/await everywhere and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });