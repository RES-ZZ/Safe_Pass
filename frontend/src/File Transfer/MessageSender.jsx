// src/FileTransfer/MessageSender.js
import { useState, useEffect } from "react";
import { Buffer } from "buffer";
import { Form, Button, Alert } from "react-bootstrap";
import CryptoJS from "crypto-js";
import ipfs from "../utils/ipfs.jsx";
import { ethers } from "ethers";
import PropTypes from "prop-types";
import { fileABI } from "../components/fileABI.jsx"; // Import fileAbi

const MessageSender = ({ account, contractAddress }) => {
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  // const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchMessages = async () => {
      if (window.ethereum && account && contractAddress) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            fileABI,
            signer
          );

          const count = await contract.getMessagesCount();
          let msgs = [];
          for (let i = 0; i < count; i++) {
            const msg = await contract.getMessage(i);
            if (msg.receiver.toLowerCase() === account.toLowerCase()) {
              msgs.push(msg);
            }
          }
          setMessages(msgs);
        } catch (error) {
          console.error("Smart Contract Error:", error);
          alert("Failed to fetch messages from blockchain.");
        }
      }
    };
    fetchMessages();
  }, [account, contractAddress]);
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!receiver || (!message && !file)) {
      alert("Please enter a receiver and a message or file.");
      return;
    }

    setStatus("Processing...");

    // Generate a secret key
    const secretKey = CryptoJS.lib.WordArray.random(16).toString();

    let ipfsHash = "";
    let encryptedSecretKey = "";

    try {
      if (file) {
        // Encrypt the file
        const encryptedFile = CryptoJS.AES.encrypt(
          CryptoJS.lib.WordArray.create(await file.arrayBuffer()),
          secretKey
        ).toString();

        // Convert encrypted file to Buffer
        const buffer = Buffer.from(encryptedFile, "utf-8");

        // Upload encrypted file to IPFS
        const result = await ipfs.add(buffer);
        ipfsHash = result.path;
      } else if (message) {
        // Encrypt the message
        const encryptedMessage = CryptoJS.AES.encrypt(
          message,
          secretKey
        ).toString();

        // Convert encrypted message to Buffer
        const buffer = Buffer.from(encryptedMessage, "utf-8");

        // Upload encrypted message to IPFS
        const result = await ipfs.add(buffer);
        ipfsHash = result.path;
      }

      // Encrypt the secret key with the receiver's public key (Future Enhancement)
      // For now, we'll assume manual sharing, so we'll store it as is
      encryptedSecretKey = secretKey; // Insecure, replace with proper encryption

      setStatus("Uploading to blockchain...");

      // Interact with smart contract
      await sendToBlockchain(receiver, ipfsHash, encryptedSecretKey);

      setStatus("Message/File sent successfully!");
      // Reset form
      setReceiver("");
      setMessage("");
      setFile(null);
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred while sending the message/file.");
    }
  };

  const sendToBlockchain = async (receiver, ipfsHash, encryptedSecretKey) => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, fileAbi, signer);
        const tx = await contract.sendMessage(
          receiver,
          ipfsHash,
          encryptedSecretKey
        );
        await tx.wait();
      } catch (error) {
        console.error("Smart Contract Error:", error);
        throw new Error(
          `Failed to send message via blockchain: ${error.message}`
        );
      }
    } else {
      throw new Error("Ethereum object not found. Please install MetaMask.");
    }
  };

  return (
    <Form onSubmit={sendMessage} className="mt-3">
      <Form.Group controlId="receiver">
        <Form.Label>Receiver Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter receiver's Ethereum address"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="message">
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="file">
        <Form.Label>File</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-2">
        Send
      </Button>

      {status && (
        <Alert variant="info" className="mt-3">
          {status}
        </Alert>
      )}
    </Form>
  );
};

MessageSender.propTypes = {
  account: PropTypes.string.isRequired,
  contractAddress: PropTypes.string.isRequired,
};

export default MessageSender;
