require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const contractABI = require('./contractABI.json'); // Ensure ABI is correctly imported

const app = express();
app.use(bodyParser.json());

// Initialize Web3 with Infura or another provider
const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);

// Organization's wallet
const organizationAccount = web3.eth.accounts.privateKeyToAccount(process.env.ORGANIZATION_PRIVATE_KEY);
web3.eth.accounts.wallet.add(organizationAccount);
web3.eth.defaultAccount = organizationAccount.address;

// Smart contract instance
const contract = new web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS);

// Endpoint to register user
app.post('/api/register-user', async (req, res) => {
    const { publicKey, account } = req.body;

    if (!publicKey || !account) {
        return res.status(400).json({ message: 'Public key and account are required.' });
    }

    try {
        // Optional: Verify that the publicKey corresponds to the account
        // This can be done by requiring the user to sign a message and verify the signature here

        // Call the smart contract's registerUser function
        const tx = contract.methods.registerUser(account, publicKey);

        // Estimate gas
        const gas = await tx.estimateGas({ from: organizationAccount.address });

        // Get gas price
        const gasPrice = await web3.eth.getGasPrice();

        // Send transaction
        const receipt = await tx.send({
            from: organizationAccount.address,
            gas,
            gasPrice,
        });

        console.log(`User registered on-chain: ${receipt.transactionHash}`);

        res.status(200).json({ message: 'User registered on-chain successfully!', transactionHash: receipt.transactionHash });
    } catch (error) {
        console.error('Error registering user on-chain:', error);
        res.status(500).json({ message: 'Failed to register user on-chain.', error: error.toString() });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
