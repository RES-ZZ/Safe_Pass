import { useState, useEffect } from "react";
import Web3 from "web3";
import PropTypes from "prop-types";

// Web3Provider component definition
const Web3Provider = ({ setContract, setAccount }) => {
  const [web3, setWeb3] = useState(null);

  // Load web3 and blockchain data when component mounts
  useEffect(() => {
    const loadWeb3AndBlockchainData = async () => {
      await loadWeb3();

      // Define loadBlockchainData inside useEffect to avoid dependency warning
      const loadBlockchainData = async () => {
        if (web3) {
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]); // Set user's account in the parent component

          // Load the smart contract
          const abi = [
            // ABI from Remix
          ];
          const contractAddress = "/* Deployed Contract Address */";
          const contractInstance = new web3.eth.Contract(abi, contractAddress);
          setContract(contractInstance); // Set contract instance in the parent component
        }
      };

      await loadBlockchainData(); // Call loadBlockchainData after web3 is initialized
    };

    loadWeb3AndBlockchainData(); // Run the function when the component mounts
  }, [setContract, setAccount]); // Only include setContract and setAccount as dependencies

  // Function to connect to MetaMask, prioritizing MetaMask over other wallets
  const loadWeb3 = async () => {
    if (window.ethereum) {
      // Check if MetaMask is installed by checking ethereum provider properties
      if (window.ethereum.isMetaMask) {
        try {
          // Request account access
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance); // Store the Web3 instance in state
        } catch (error) {
          console.error(
            "User denied account access or some error occurred",
            error
          );
        }
      } else {
        alert("Please use MetaMask as your wallet for this app.");
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask!");
    }
  };

  return (
    <div>
      <h2>Web3 Provider</h2>
      {web3 ? <p>Connected to MetaMask!</p> : <p>Connecting to MetaMask...</p>}
    </div>
  );
};

// Move PropTypes declaration **after** the component definition to avoid initialization issues
Web3Provider.propTypes = {
  setContract: PropTypes.func.isRequired,
  setAccount: PropTypes.func.isRequired,
};

export default Web3Provider;
