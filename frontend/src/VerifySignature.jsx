import PropTypes from "prop-types";
import { useState } from "react";
const VerifySignature = ({ contract }) => {
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  const verifySignature = async () => {
    try {
      const messageHash = window.web3.utils.sha3(message);
      const isVerified = await contract.methods
        .verifySignature(messageHash, signature)
        .call();
      setVerificationResult(isVerified);
      alert(isVerified ? "Signature Verified!" : "Signature Invalid!");
    } catch (error) {
      console.error("Error verifying signature:", error);
    }
  };

  return (
    <div>
      <h3>Verify Signature</h3>
      <input
        type="text"
        placeholder="Enter Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Signature"
        value={signature}
        onChange={(e) => setSignature(e.target.value)}
      />
      <button onClick={verifySignature}>Verify</button>

      {verificationResult !== null && (
        <p>Verification Result: {verificationResult ? "Valid" : "Invalid"}</p>
      )}
    </div>
  );
};

// Add PropTypes for validation
VerifySignature.propTypes = {
  contract: PropTypes.object.isRequired,
  account: PropTypes.string.isRequired,
};

export default VerifySignature;
