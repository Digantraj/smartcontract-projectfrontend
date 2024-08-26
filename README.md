# AuctionHouse Smart Contract

## Overview

This repository contains a smart contract for an auction house written in Solidity, along with a front-end application to interact with the contract. The smart contract allows users to create auctions, place bids, and end auctions. The front-end application is built using JavaScript and the ethers.js library to interact with the Ethereum blockchain.

## Smart Contract

### Description

The `AuctionHouse` contract includes the following functionalities:
- **Create Auction:** Allows users to create new auctions.
- **Place Bid:** Allows users to place bids on active auctions.
- **End Auction:** Allows the auction owner to end the auction and transfer the highest bid amount to their address.
- **Get Bids:** Allows users to retrieve all bids for a specific auction.

## Front-End Application

### Description

The front-end application interacts with the `AuctionHouse` smart contract using ethers.js. It allows users to create auctions, place bids, end auctions, and view bids.

### How to Use the Application

1. **Create Auction**
   - Click the "Create Auction" button.
   - **What Happens**: This triggers the `createAuction` function, which sends a transaction to the smart contract to create a new auction. The auction will then be added to the list of auctions displayed on the page.

2. **Place Bid**
   - Enter the Auction ID in the input field labeled "Auction ID".
   - Enter the bid amount in the input field labeled "Bid Amount".
   - Click the "Place Bid" button.
   - **What Happens**: This triggers the `placeBid` function. A transaction is sent to the smart contract to place a bid on the specified auction. If the bid is successful, it updates the highest bid and bidder for that auction. The auction information is then refreshed to reflect the new bid.

3. **End Auction**
   - Enter the Auction ID in the input field labeled "Auction ID".
   - Click the "End Auction" button.
   - **What Happens**: This triggers the `endAuction` function, which sends a transaction to the smart contract to end the specified auction. The highest bid amount is transferred to the auction owner, and the auction status is updated. The list of auctions is refreshed to show the updated status.

4. **Show Bids**
   - Enter the Auction ID in the input field labeled "Auction ID".
   - Click the "Show Bids" button.
   - **What Happens**: This triggers the `showBids` function, which queries the smart contract for all bids placed on the specified auction. The bid details are then displayed in the "bidsInfo" div.

## Setup and Usage

1. **Install Dependencies**: Ensure you have Node.js and npm installed. Run `npm install` to install any required dependencies.
2. **Compile and Deploy Contract**: Use a Solidity compiler to compile the `AuctionHouse` contract and deploy it to an Ethereum network.
3. **Configure Front-End**: Replace the `contractAddress` variable in the front-end JavaScript with the address of your deployed contract.
4. **Run the Application**: Open the HTML file in a browser with MetaMask installed and connected to the Ethereum network.

## Authors

- **Digant Raj**  
  GitHub: [@Digant](https://github.com/Digantraj)

  
## License

This project is licensed under the MIT License.
