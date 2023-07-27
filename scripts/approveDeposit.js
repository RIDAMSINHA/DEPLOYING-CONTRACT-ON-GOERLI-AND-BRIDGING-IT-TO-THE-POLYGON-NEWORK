const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/eyes.sol/eyes.json");

const tokenAddress = "0x5424De28DA3c033a69EF8B2E17c371e0B17052bE"; // place your erc721 contract address here
const tokenABI = tokenContractJSON.abi;
const fxERC721RootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
const walletAddress = "0xE6c82A490314A404E4b2976cc26dA0Aa2F089902"; // place your public address for your wallet here

async function main() {

    const tokenContract = await hre.ethers.getContractAt(tokenABI, tokenAddress);
    const fxContract = await hre.ethers.getContractAt(fxRootContractABI, fxERC721RootAddress);
    const totalSupply = await tokenContract.totalSupply();

    for (let i = 0; i < totalSupply; i++) {
    const tokenId = await tokenContract.tokenByIndex(i);
    
    const approveTx = await tokenContract.approve(fxERC721RootAddress, tokenId);
    await approveTx.wait();

    console.log('Approval confirmed');


    const depositTx = await fxContract.deposit(tokenAddress, walletAddress, tokenId, "0x6556");
    await depositTx.wait();

    console.log("NFT deposited");
    }
  }
  
  // This pattern is recommanded to be able to use async/await everywhere and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });