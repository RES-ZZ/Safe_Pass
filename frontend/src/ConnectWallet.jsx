import { useState } from "react";
import Web3 from "web3";
import elliptic from "elliptic";

const EC = elliptic.ec;
const ec = new EC("secp256k1"); // Same curve used by Ethereum

// ABI and contract address
const contractABI = [
  [
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_publicKey",
          type: "bytes32",
        },
      ],
      name: "registerUser",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "userPublicKeys",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_message",
          type: "bytes32",
        },
        {
          internalType: "bytes",
          name: "_signature",
          type: "bytes",
        },
      ],
      name: "verifySignature",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
];
const contractAddress = "0x943F32fF4b2de17860632f471CA52B3176CeEbFe"; // Your contract address

const ConnectWallet = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [publicKey, setPublicKey] = useState(""); // For storing the generated public key
  const [privateKey, setPrivateKey] = useState(""); // For storing the generated private key

  const connectMetaMask = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        // Load contract instance
        const contractInstance = new web3.eth.Contract(
          contractABI,
          contractAddress
        );
        setContract(contractInstance);

        console.log("Contract loaded:", contractInstance); // Log to check if the contract is loaded
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask!");
    }
  };
  const getPublicKeyFromChain = async () => {
    if (contract) {
      try {
        // Call the userPublicKeys mapping with the current account address
        const storedPublicKey = await contract.methods
          .userPublicKeys(account)
          .call();
        alert("Stored public key: " + storedPublicKey);
      } catch (error) {
        console.error("Error retrieving public key from chain:", error);
      }
    } else {
      alert("Contract not loaded or account not connected.");
    }
  };

  // Function to generate a public/private key pair using elliptic
  const generateKeyPair = () => {
    const keyPair = ec.genKeyPair(); // Generate new key pair
    const pubKey = keyPair.getPublic("hex"); // Get public key in hex format
    const privKey = keyPair.getPrivate("hex"); // Get private key in hex format

    setPublicKey(pubKey);
    setPrivateKey(privKey);

    console.log("Public Key:", pubKey);
    console.log("Private Key:", privKey);
  };

  // Function to register the public key on the blockchain
  const registerPublicKeyOnChain = async () => {
    if (contract) {
      if (publicKey) {
        try {
          // Register the public key using the contract's `registerUser` function
          await contract.methods
            .registerUser(publicKey)
            .send({ from: account });
          alert("Public key registered successfully on-chain!");
        } catch (error) {
          console.error("Error registering public key on-chain:", error);
        }
      } else {
        alert("Public key is missing. Please generate a key first.");
      }
    } else {
      alert("Contract not loaded. Please ensure MetaMask is connected.");
    }
  };

  return (
    <div>
      <button onClick={connectMetaMask}>Connect MetaMask Wallet</button>
      {account && <p>Connected Account: {account}</p>}

      {/* Button to generate public/private key pair */}
      <h2>Generate Public/Private Key Pair</h2>
      <button onClick={generateKeyPair}>Generate Keys</button>

      {publicKey && <p>Public Key: {publicKey}</p>}
      {privateKey && <p>Private Key: {privateKey}</p>}

      {/* Button to register public key on the blockchain */}
      <h2>Register Public Key on Blockchain</h2>
      <button onClick={registerPublicKeyOnChain}>Register Public Key</button>

      <button onClick={getPublicKeyFromChain}>Get Stored Public Key</button>
    </div>
  );
};

export default ConnectWallet;
