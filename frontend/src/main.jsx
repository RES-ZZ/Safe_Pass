import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Login from "./Login.jsx";
import ConnectWallet from "./ConnectWallet.jsx"; // Import ConnectWallet component
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Default route to the Login page */}
        <Route path="/" element={<Login />} />
        {/* Route for the ConnectWallet component */}
        <Route path="/connect-wallet" element={<ConnectWallet />} />
        {/* Route for the main app after login */}
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);






