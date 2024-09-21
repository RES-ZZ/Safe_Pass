import React from "react";
import ConnectWallet from "./ConnectWallet"; // Import ConnectWallet for the main app
import './App.css'; // Import the CSS

function App() {
  return (
    <div className="App">
      <h1>Blockchain Authentication App</h1>
      <ConnectWallet /> {/* Render the ConnectWallet component */}
    </div>
  );
}

export default App;





