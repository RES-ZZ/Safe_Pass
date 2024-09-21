import React, { useState } from "react";
import { ethers } from "ethers"; // Import ethers for key generation
import './RegisterUser.css'; // Add your styles

function RegisterUser() {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  // Function to generate public/private key pair
  const generateKeyPair = () => {
    // Generate a random wallet (public/private key pair)
    const wallet = ethers.Wallet.createRandom();
    setPublicKey(wallet.address); // Public key (address)
    setPrivateKey(wallet.privateKey); // Private key
  };

  return (
    <div className="register-page-container">
      <h2>Register User - Generate Public/Private Keys</h2>
      <p>Click the button below to generate your key pair:</p>
      <button onClick={generateKeyPair} className="generate-keys-btn">
        Generate Keys
      </button>

      {publicKey && (
        <div className="key-pair-container">
          <div>
            <strong>Public Key (Address):</strong>
            <p>{publicKey}</p>
          </div>
          <div>
            <strong>Private Key:</strong>
            <p>{privateKey}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterUser;