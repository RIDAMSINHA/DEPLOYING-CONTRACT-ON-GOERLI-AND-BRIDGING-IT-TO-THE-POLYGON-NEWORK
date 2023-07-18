// This script batch mints eyes ERC721A tokens.

// Import required libraries
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  // Get private key from env
  const privateKey = process.env.PRIVATE_KEY;

  // The URL of the network provider
  const networkAddress =
    "https://eth-goerli.g.alchemy.com/v2/31P81Y8oNJOnETlIglCJ73OKTKKrwZDb";

  // Create a provider using the URL
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  // Create a signer from the private key and provider
  const signer = new ethers.Wallet(privateKey, provider);

  // Tthe address of the deployed contract
  const contractAddress = "0xFfC284eCF1e898e01b617be4C3D8cB1C5Ec57B92";

  // Get the contract factory and attach it to the signer
  const EYESNFT = await ethers.getContractFactory("eyes", signer);
  const contract = await EYESNFT.attach(contractAddress);

  // Call the mint function on the contract to mint 5 tokens
  await contract.mint(5);

  // Log a message to the console to indicate that the tokens have been minted
  console.log("Minted 5 tokens");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
