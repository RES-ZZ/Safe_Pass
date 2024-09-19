import React, { useState } from "react";
import Web3Provider from "./Web3Provider";
import RegisterUser from "./RegisterUser";
import VerifySignature from "./VerifySignature";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");

  return (
    <div className="App">
      <h1>Blockchain Authentication</h1>

      {/* Web3Provider will handle connection and load the contract */}
      <Web3Provider setContract={setContract} setAccount={setAccount} />

      {/* Only render RegisterUser and VerifySignature once contract and account are loaded */}
      {contract && account && (
        <>
          <RegisterUser contract={contract} account={account} />
          <VerifySignature contract={contract} account={account} />
        </>
      )}
    </div>
  );
}

export default App;
