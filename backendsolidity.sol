// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AuctionHouse {
    struct Auction {
        uint id;
        address owner;
        uint highestBid;
        address highestBidder;
        bool active;
    }

    struct Bid {
        address bidder;
        uint amount;
    }

    Auction[] public auctions;
    uint public auctionCount;

    mapping(uint => Bid[]) public auctionBids; // Mapping to store bids for each auction

    event AuctionCreated(uint id, address owner);
    event BidPlaced(uint auctionId, address bidder, uint amount);
    event AuctionEnded(uint auctionId, address winner, uint amount);

    // Create a new auction
    function createAuction() public {
        auctionCount++;
        auctions.push(Auction({
            id: auctionCount,
            owner: msg.sender,
            highestBid: 0,
            highestBidder: address(0),
            active: true
        }));
        emit AuctionCreated(auctionCount, msg.sender);
    }

    // Place a bid on an auction
    function placeBid(uint auctionId) public payable {
        require(auctionId > 0 && auctionId <= auctionCount, "Invalid auction ID");
        Auction storage auction = auctions[auctionId - 1];
        require(auction.active, "Auction is not active");
        require(msg.value > auction.highestBid, "Bid must be higher than current highest bid");

        // Refund the previous highest bidder
        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.highestBid);
        }

        auction.highestBid = msg.value;
        auction.highestBidder = msg.sender;
        auctionBids[auctionId].push(Bid({
            bidder: msg.sender,
            amount: msg.value
        }));

        emit BidPlaced(auctionId, msg.sender, msg.value);
    }

    // End an auction and transfer the highest bid to the owner
    function endAuction(uint auctionId) public {
        require(auctionId > 0 && auctionId <= auctionCount, "Invalid auction ID");
        Auction storage auction = auctions[auctionId - 1];
        require(msg.sender == auction.owner, "Only the owner can end the auction");
        require(auction.active, "Auction already ended");

        auction.active = false;
        if (auction.highestBidder != address(0)) {
            payable(auction.owner).transfer(auction.highestBid);
            emit AuctionEnded(auctionId, auction.highestBidder, auction.highestBid);
        }
    }

    // Retrieve all bids for a specific auction
    function getBids(uint auctionId) public view returns (Bid[] memory) {
        require(auctionId > 0 && auctionId <= auctionCount, "Invalid auction ID");
        return auctionBids[auctionId];
    }
}
