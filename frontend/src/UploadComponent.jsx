// Example: UploadComponent.js
import { useState } from "react";
import ipfs from "./utils/ipfs";

const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      const result = await ipfs.add(file);
      setCid(result.path);
      alert(`File uploaded successfully! CID: ${result.path}`);
    } catch (error) {
      console.error("Error uploading file: ", error);
      alert("File upload failed.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload to IPFS</button>
      {cid && <p>File CID: {cid}</p>}
    </div>
  );
};

export default UploadComponent;
