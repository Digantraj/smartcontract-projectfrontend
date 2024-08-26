const contractAddress = '0x11c620c07E229943801Acf1258D9054E96A2AD4F';
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "AuctionCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "AuctionEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "BidPlaced",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "createAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			}
		],
		"name": "endAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			}
		],
		"name": "placeBid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "auctionBids",
		"outputs": [
			{
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "auctionCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "auctions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "highestBid",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "highestBidder",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			}
		],
		"name": "getBids",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "bidder",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"internalType": "struct AuctionHouse.Bid[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

let provider;
let signer;
let contract;

window.onload = async () => {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts= await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(accounts[0]);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        displayAuctions();
    } else {
        alert('Please install MetaMask!');
    }
};

async function createAuction() {
    const tx = await contract.createAuction();
    await tx.wait();
    displayAuctions();
}

async function placeBid() {
    const auctionId = document.getElementById('auctionId').value;
    const bidAmount = document.getElementById('bidAmount').value;
    const tx = await contract.placeBid(auctionId, { value: ethers.utils.parseEther(bidAmount) });
    await tx.wait();
    displayAuctions();
}

async function placeMultipleBids() {
    const auctionId = document.getElementById('multiAuctionId').value;
    const bidAmount1 = document.getElementById('bidAmount1').value;
    const bidAmount2 = document.getElementById('bidAmount2').value;
    const bidAmount3 = document.getElementById('bidAmount3').value;

    const accounts = await provider.listAccounts();
    if (accounts.length < 4) {
        alert('Not enough accounts available for bidding.');
        return;
    }

    const tx1 = await contract.placeBid(auctionId, { value: ethers.utils.parseEther(bidAmount1), from: accounts[1] });
    await tx1.wait();
    const tx2 = await contract.placeBid(auctionId, { value: ethers.utils.parseEther(bidAmount2), from: accounts[2] });
    await tx2.wait();
    const tx3 = await contract.placeBid(auctionId, { value: ethers.utils.parseEther(bidAmount3), from: accounts[3] });
    await tx3.wait();

    displayAuctions();
}

async function endAuction() {
    const auctionId = document.getElementById('endAuctionId').value;
    const tx = await contract.endAuction(auctionId);
    await tx.wait();
    displayAuctions();
}

async function showBids() {
    const auctionId = document.getElementById('showBidsAuctionId').value;
    const bids = await contract.getBids(auctionId);
    const bidsInfoDiv = document.getElementById('bidsInfo');

    bidsInfoDiv.innerHTML = '';
    bids.forEach(bid => {
        bidsInfoDiv.innerHTML += `
            <div>
                <p>Bidder: ${bid.bidder}</p>
                <p>Amount: ${ethers.utils.formatEther(bid.amount)} ETH</p>
                <hr>
            </div>
        `;
    });
}

async function displayAuctions() {
    const auctionInfoDiv = document.getElementById('auctionInfo');
    const auctionCount = await contract.auctionCount();
    let auctionsHTML = '';

    for (let i = 0; i < auctionCount; i++) {
        const auction = await contract.auctions(i);
        auctionsHTML += `
            <div>
                <h3>Auction ID: ${auction.id.toString()}</h3>
                <p>Owner: ${auction.owner}</p>
                <p>Highest Bid: ${ethers.utils.formatEther(auction.highestBid)} ETH</p>
                <p>Highest Bidder: ${auction.highestBidder}</p>
                <p>Status: ${auction.active ? 'Active' : 'Ended'}</p>
                <hr>
            </div>
        `;
    }
    auctionInfoDiv.innerHTML = auctionsHTML;
}
