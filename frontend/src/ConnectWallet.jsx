import { useState } from "react";
import Web3 from "web3"; // Ensure Web3 is imported
import elliptic from "elliptic";

// ABI and contract address for the deployed contract
const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "publicKey",
        type: "bytes32",
      },
    ],
    name: "LogRegisterUser",
    type: "event",
  },
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
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "getMessageHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getPublicKey",
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
        name: "_messageHash",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "validateSignature",
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
  {
    inputs: [
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "validateSignatureWithMessage",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "verifyUser",
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
];
const contractAddress = "0x987904bE3875FD0034a257777a68D20C286F4801"; // Replace with actual contract address
 // Replace with actual contract address

// Elliptic curve for key generation
const EC = elliptic.ec;
const ec = new EC("secp256k1"); // Same curve used by Ethereum

const ConnectWallet = () => {
  const [account, setAccount] = useState(null); // MetaMask account (public key)
  const [contract, setContract] = useState(null); // Smart contract instance
  const [publicKeyX, setPublicKeyX] = useState(""); // X-coordinate of the public key (32 bytes)
  const [privateKey, setPrivateKey] = useState(""); // Generated private key
  const [web3, setWeb3] = useState(null); // Web3 instance

  // States for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Connect to MetaMask and initialize Web3
  const connectMetaMask = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3Instance = new Web3(window.ethereum); // Initialize Web3 instance
        setWeb3(web3Instance); // Set the Web3 instance to state

        // Get MetaMask accounts and set account (Ethereum address)
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]); // Set the MetaMask account

        // Load the contract instance
        const contractInstance = new web3Instance.eth.Contract(
          contractABI,
          contractAddress
        );
        setContract(contractInstance);

        console.log("Connected MetaMask Account:", accounts[0]);
        console.log("Contract loaded:", contractInstance);
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask!");
    }
  };

  // Generate a new public/private key pair and get the X-coordinate of the public key
  const generateKeyPair = () => {
    const keyPair = ec.genKeyPair(); // Generate new key pair

    // Get the X-coordinate of the public key (32 bytes)
    const pubKeyX = keyPair.getPublic().getX().toString(16).padStart(64, "0"); // Ensure 32 bytes (64 hex characters)

    setPublicKeyX(pubKeyX); // Store the X-coordinate of the public key
    setPrivateKey(keyPair.getPrivate("hex")); // Store the private key

    console.log("32-byte Public Key (X-coordinate): 0x" + pubKeyX);
    console.log("Private Key:", keyPair.getPrivate("hex"));
  };

  // Register the 32-byte public key on-chain
  const registerPublicKeyOnChain = async () => {
    if (contract && publicKeyX && web3) {
      try {
        console.log(
          "Registering 32-byte Public Key (X-coordinate):",
          publicKeyX
        );

        // Convert the hex public key to bytes32 format
        const publicKeyBytes32 = "0x" + publicKeyX.padStart(64, "0"); // Ensure it's 32 bytes (64 hex chars)

        console.log("Public Key (Bytes32):", publicKeyBytes32);

        // Register the public key on-chain (in bytes32 format)
        await contract.methods.registerUser(publicKeyBytes32).send({
          from: account,
          gas: 300000,
          gasPrice: await web3.eth.getGasPrice(),
        });

        alert("Public key registered successfully on-chain!");
      } catch (error) {
        console.error("Error registering public key on-chain:", error.message);
      }
    } else {
      alert(
        "Contract or public key not loaded. Please ensure MetaMask is connected."
      );
    }
  };

  const getRegisteredPublicKey = async () => {
    if (contract && account) {
      try {
        const registeredKey = await contract.methods
          .userPublicKeys(account)
          .call();
        console.log("Registered Public Key:", registeredKey);
        alert(`Public Key for ${account}: ${registeredKey}`);
      } catch (error) {
        console.error("Error retrieving public key:", error.message);
      }
    } else {
      alert("Contract or account not connected.");
    }
  };

  const verifyPublicKey = async () => {
    if (contract && account) {
      try {
        // Call the verifyUser function in the smart contract
        const isRegistered = await contract.methods.verifyUser(account).call();
        if (isRegistered) {
          alert(`Public Key is registered for account: ${account}`);
        } else {
          alert(`No Public Key registered for account: ${account}`);
        }
      } catch (error) {
        console.error("Error verifying public key:", error.message);
      }
    } else {
      alert("Contract or account not loaded.");
    }
  };

  // Handle form submission for username and password
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Username: ${username}, Password: ${password}`);
    // Reset the fields after submission
    setUsername("");
    setPassword("");
  };
  async function validateSignatureOnChain(message) {
    if (!web3 || !contract || !account) {
      console.log("Web3, contract, or account not loaded.");
      return;
    }

    try {
      // Step 1: Hash the message with the Ethereum prefix
      const messageHash = web3.utils.sha3(
        "\x19Ethereum Signed Message:\n" + message.length + message
      );
      console.log("Message Hash:", messageHash);

      // Step 2: Sign the message using MetaMask
      const signature = await web3.eth.personal.sign(message, account, "");
      console.log("Signature:", signature);

      // Step 3: Call the validateSignature function in your contract
      const isValid = await contract.methods
        .validateSignature(messageHash, signature)
        .call();

      if (isValid) {
        console.log("Signature is valid!");
        alert("Signature is valid!");
      } else {
        console.log("Signature is invalid!");
        alert("Signature is invalid!");
      }
    } catch (error) {
      console.error("Error validating signature on-chain:", error.message);
    }
  }


  return (
    <div>
      <button onClick={connectMetaMask}>Connect MetaMask Wallet</button>
      {account && <p>Connected Account (Ethereum Address): {account}</p>}

      {/* Generate Key Pair */}
      <h2>Generate Public/Private Key Pair (32-byte Public Key)</h2>
      <button onClick={generateKeyPair}>Generate Keys</button>

      {publicKeyX && (
        <p>Generated Public Key (32-byte X-coordinate): 0x{publicKeyX}</p>
      )}
      {privateKey && <p>Generated Private Key: {privateKey}</p>}

      {/* Register Public Key on the blockchain */}
      <h2>Register Public Key on Blockchain</h2>
      <button onClick={registerPublicKeyOnChain}>Register Public Key</button>
      <div>
        <h2>View Registered Key</h2>
        <button onClick={getRegisteredPublicKey}>View Key</button>
      </div>
      <div>
        {/* Button to verify if the public key is registered */}
        <h2>Verify Public Key</h2>
        <button onClick={verifyPublicKey}>Verify Public Key</button>
      </div>

      {/* Username and Password Box */}
      <div className="credentials-box">
        <h3>Enter Credentials</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
    
        <h2>validateSignatureOnChain</h2>
        <button onClick={() => validateSignatureOnChain("My Message")}>
          Validate Signature
        </button>
      </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ConnectWallet;

