import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Login from "./Login.jsx";
import RegisterUser from "./RegisterUser.jsx"; // Import RegisterUser component
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Default route for login */}
        <Route path="/" element={<Login />} />
        {/* Route for registering the user */}
        <Route path="/register" element={<RegisterUser />} />
        {/* Route for the main app */}
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

