import { useState, useEffect, useCallback } from "react";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const CONTRACT_ABI = [
  "function shareFile(address recipient, string memory ipfsHash) public",
  "function getMyFiles() public view returns (tuple(address sender, string ipfsHash, uint256 timestamp)[] memory)",
];

// Create an IPFS client
const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

function RegistrationPage() {
  const [account, setAccount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [file, setFile] = useState(null);
  const [sharedFiles, setSharedFiles] = useState([]);

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setAccount(await signer.getAddress());
        fetchFiles();
      } catch (error) {
        console.error("Failed to connect to wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }, []);

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

  async function shareFile() {
    if (!file || !recipient) return;

    try {
      const added = await ipfs.add(file);
      const ipfsHash = added.path;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      await contract.shareFile(recipient, ipfsHash);
      alert("File shared successfully!");
      setFile(null);
      setRecipient("");
      fetchFiles();
    } catch (error) {
      console.error("Error sharing file:", error);
      alert("Failed to share file");
    }
  }

  async function fetchFiles() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    try {
      const files = await contract.getMyFiles();
      setSharedFiles(files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }

  return (
    <div className="App">
      <h1>Secure File Sharing</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <h2>Share a File</h2>
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={shareFile}>Share File</button>

          <h2>My Shared Files</h2>
          {sharedFiles.map((file, index) => (
            <div key={index}>
              <p>From: {file.sender}</p>
              <p>IPFS Hash: {file.ipfsHash}</p>
              <p>
                Time:{" "}
                {new Date(file.timestamp.toNumber() * 1000).toLocaleString()}
              </p>
              <a
                href={`https://ipfs.io/ipfs/${file.ipfsHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View File
              </a>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default RegistrationPage;
