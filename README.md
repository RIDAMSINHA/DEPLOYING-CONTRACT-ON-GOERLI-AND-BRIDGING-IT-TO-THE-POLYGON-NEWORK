# Polygon-Module-1

Welcome to the Polygon-Module-1 repository! This repository contains the code for the first project in the Polygon-Advanced course. In this project, we will be deploying an NFT collection on the Ethereum blockchain, mapping the collection to Polygon, and transferring assets via the Polygon Bridge.

## Getting Started

To get started with the project, please follow the steps below:

1. Download the entire repository to your local machine.
2. By this https://github.com/RIDAMSINHA/DEPLOYING-CONTRACT-ON-GOERLI-AND-BRIDGING-IT-TO-THE-POLYGON-NEWORK.git
3. Run the command `npm install` to install all the necessary project dependencies.
4. Once the dependencies are installed, run the test file using the command `npx hardhat compile`.

## Deploying the ERC721 Contract

Before deploying the ERC721 contract, ensure that you have your wallet private key available (`PRIVATE_KEY='your wallet private key'`).

To deploy the ERC721 contract to the Goerli Ethereum Testnet, use the following command:

```
npx hardhat run scripts/deploy.js --network goerli
```

After deploying the contract, an address will be generated. Copy this address and update `contractAddress.js` (located in the metadata folder) and `batchMint.js` (located in the scripts folder) with the new contract address.

## Batch Mint NFTs

To batch-mint NFTs using the deployed ERC721 contract, run the following command:

```
npx hardhat run scripts/batchMint.js --network goerli
```

This script will mint the specified number of NFTs and assign them to your address.

## Approve and Deposit NFTs to Polygon Mumbai

To approve and deposit the minted NFTs from Ethereum to the Polygon Mumbai network using the FxPortal Bridge, follow these steps:

1. Map the FxPortal Bridge address to the file.
2. Execute the following command:

```
npx hardhat run scripts/approvedDeposit.js --network goerli
```

## BalanceOf NFTs

To check the balance of NFTs using the deployed ERC721 contract on the mumbai testnet, run the following command:

```
npx hardhat run scripts/balanceOf.js --network mumbai
```

This script will return the balance of the nfts of your contract in that specified network.

## Authors

RIDAM ADITYA SINHA

https://www.linkedin.com/in/ridam-sinha-188133210/

ridamsinha20@gmail.com

## License

This project is licensed under the MIT License.
