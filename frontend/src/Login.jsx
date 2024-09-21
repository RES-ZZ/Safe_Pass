import React from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
  const navigate = useNavigate();

  // Navigate to the registration page
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-page-container">
      <h2>Welcome</h2>
      <p>Choose an option to continue:</p>
      <div className="button-group">
        <button onClick={handleRegister} className="register-btn">Register</button>
      </div>
    </div>
  );
}

export default Login;






