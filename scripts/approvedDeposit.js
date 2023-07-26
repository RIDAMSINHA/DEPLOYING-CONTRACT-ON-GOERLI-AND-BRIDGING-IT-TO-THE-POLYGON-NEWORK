const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {
  try {
    const networkAddress = 'https://polygon-testnet.public.blastapi.io'; // Mumbai network RPC URL
    const privateKey = process.env.PRIVATE_KEY;
    const provider = new ethers.providers.JsonRpcProvider(networkAddress);

    const wallet = new ethers.Wallet(privateKey, provider);

    const signer = wallet.connect(provider);
    // Get the eyes contract instance
    const nftAddress = '0x0403792Fe779299cF8230337e57dF7227e7ac6e1'; 
    const NFT = await ethers.getContractFactory("eyes");
    const nft = NFT.attach(nftAddress)
    // Get the FxPortalBridge contract instance for Mumbai network
    const fxPortalBridgeAddress = '0xF9bc4a80464E48369303196645e876c8C7D972de'; 
    const FxPortalBridge = await ethers.getContractFactory("FxPortalBridge"); 
    const fxPortalBridge = FxPortalBridge.attach(fxPortalBridgeAddress);

    // Token IDs to transfer
    const tokenIds = [0, 1, 2, 3, 4];

    for (let i = 0; i < tokenIds.length; i++) {
      await nft.connect(signer).approve(fxPortalBridgeAddress, tokenIds[i]);
    }
    console.log(`NFTs approved for transfer.`);
    const data = "Additional data related to the deposit"; 
    const depositTx = await fxPortalBridge.connect(signer).deposit(data, nft.address, tokenIds, { gasPrice: ethers.utils.parseUnits("100", "gwei") });
    await depositTx.wait();

    console.log("NFTs deposited to the mumbai network for transfer.");
  } catch (error) {
    console.error(error);
  }
}
main();