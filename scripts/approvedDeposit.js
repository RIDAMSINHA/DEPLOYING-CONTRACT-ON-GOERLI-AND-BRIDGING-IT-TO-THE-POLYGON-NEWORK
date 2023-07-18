//import c from "contracts/examples/erc721-transfer/FxERC721RootTunnel.sol"// Import necessary packages and contracts
const { ethers } = require("hardhat");
const { FXRootContractAbi } = require("../artifacts/FXRootContractAbi.js");
const ABI = require("../artifacts/contracts/eyes.sol/eyes.json");
require("dotenv").config();

//Transfer ERC721A tokens to the Ethereum FxChain network
async function main() {
  // Set up connections to network and wallet
  const networkAddress =
    "https://eth-goerli.g.alchemy.com/v2/31P81Y8oNJOnETlIglCJ73OKTKKrwZDb";
  const privateKey = process.env.PRIVATE_KEY;
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  // Create a wallet instance
  const wallet = new ethers.Wallet(privateKey, provider);

  // Get the signer instance
  const [signer] = await ethers.getSigners();

  // Get ERC721A contract instance
  const NFT = await ethers.getContractFactory("eyes");
  const nft = await NFT.attach("0xFfC284eCF1e898e01b617be4C3D8cB1C5Ec57B92");

  // Get FXRoot contract instance
  const fxRootAddress = "0x5F8E1E8181fEBd9662d1E250602F1498B461cf5A";
  const fxRoot = await ethers.getContractAt(FXRootContractAbi, fxRootAddress);

  // TokenIds to transfer
  const tokenIds = [0, 1, 2, 3, 4];

  // Approve the nfts for transfer
  const approveTx = await nft
    .connect(signer)
    .setApprovalForAll(fxRootAddress, true);
  await approveTx.wait();
  console.log("Approval confirmed");

  // Deposit the nfts to the FXRoot contracts
  for (let i = 0; i < tokenIds; i++) {
    const depositTx = await fxRoot
      .connect(signer)
      .deposit(nft.address, wallet.address, tokenIds[i], "0x80001");

    // Wait for the deposit to be confirmed
    await depositTx.wait();
  }

  console.log("Approved and deposited");

  // Test balanceOf
  const balance = await nft.balanceOf(wallet.address);

  // Print the balance of the wallet
  console.log(
    "EYESNFT wallet balance",
    wallet.address,
    "is: ",
    balance.toString()
  );
}

// Call the main function and handle any errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
