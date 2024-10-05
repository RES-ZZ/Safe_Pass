// src/utils/contract.js

import { ethers } from "ethers";
import { fileABI } from "../components/fileABI";

const contractAddress = "0x07A253775c53a5cC2BCecD6F3dFcEE65866b911F"; // Your deployed contract address

// Function to get the contract instance
export const getContract = () => {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return null;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, fileABI, signer);
  return contract;
};

// Function to send a file
export const sendFile = async (toAddress, ipfsHash) => {
  const contract = getContract();
  if (!contract) return;

  try {
    const tx = await contract.sendFile(toAddress, ipfsHash);
    await tx.wait(); // Wait for the transaction to be mined
    console.log("File sent:", tx);
    return tx;
  } catch (error) {
    console.error("Error sending file:", error);
    throw new Error("Failed to send file.");
  }
};

// Function to get files sent to a user
export const getFilesForUser = async (userAddress) => {
  const contract = getContract();
  if (!contract) return [];

  try {
    const files = await contract.getFilesForUser(userAddress);
    return files;
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
};
