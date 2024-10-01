const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Initialize Web3
const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`));

// Read ABI
const contractABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'contractABI.json'), 'utf-8'));
const contract = new web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS);

// Organization account
const organizationAccount = web3.eth.accounts.privateKeyToAccount(process.env.ORGANIZATION_PRIVATE_KEY);
web3.eth.accounts.wallet.add(organizationAccount);
web3.eth.defaultAccount = organizationAccount.address;

// Endpoint to register user
app.post('/api/register-user-onchain', async (req, res) => {
    const { publicKey, userAddress } = req.body;

    if (!publicKey || !userAddress) {
        return res.status(400).json({ error: 'Public key and user address are required.' });
    }

    try {
        // Prepare the transaction
        const tx = contract.methods.registerUser(userAddress, publicKey);
        const gas = await tx.estimateGas({ from: process.env.ORGANIZATION_ADDRESS });
        const gasPrice = await web3.eth.getGasPrice();

        const data = tx.encodeABI();

        const txData = {
            from: process.env.ORGANIZATION_ADDRESS,
            to: process.env.CONTRACT_ADDRESS,
            data: data,
            gas,
            gasPrice
        };

        // Sign and send the transaction
        const receipt = await web3.eth.sendTransaction(txData);

        console.log('Transaction receipt:', receipt);

        res.status(200).json({ message: 'User registered successfully on-chain.', transactionHash: receipt.transactionHash });
    } catch (error) {
        console.error('Error registering user on-chain:', error);
        res.status(500).json({ error: 'Failed to register user on-chain.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
