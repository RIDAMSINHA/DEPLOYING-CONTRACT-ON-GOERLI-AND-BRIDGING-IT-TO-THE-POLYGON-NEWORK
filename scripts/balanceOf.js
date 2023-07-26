const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/eyes.sol/eyes.json");

const tokenAddress = "0x0403792Fe779299cF8230337e57dF7227e7ac6e1"; // place your erc720 contract address here
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0xE6c82A490314A404E4b2976cc26dA0Aa2F089902"; // place your public address for your wallet here

async function main() {

    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);

    console.log("You now have: " + await token.balanceOf(walletAddress) + " tokens");
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });