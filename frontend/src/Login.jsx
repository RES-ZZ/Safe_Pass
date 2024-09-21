import React from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'; // Add your CSS styles

function Login() {
  const navigate = useNavigate();

  // Handle MetaMask connection when the Login button is clicked
  const handleLogin = async () => {
    if (window.ethereum) {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Connected Account:", accounts[0]);
        // After successful login, navigate to the main app
        navigate("/app");
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.error("MetaMask is not installed");
    }
  };

  // Navigate to the connect wallet page instead of the register page
  const handleRegister = () => {
    navigate("/connect-wallet");
  };

  return (
    <div className="login-page-container">
      <h2>Welcome</h2>
      <p>Choose an option to continue:</p>
      <div className="button-group">
        <button onClick={handleLogin} className="login-btn">Login with MetaMask</button>
        <button onClick={handleRegister} className="register-btn">Register</button>
      </div>
    </div>
  );
}

export default Login;











