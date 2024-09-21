import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Login from "./Login.jsx";
import RegisterUser from "./RegisterUser.jsx";
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Default route to the Login page */}
        <Route path="/" element={<Login />} />
        {/* Route for the RegisterUser component */}
        <Route path="/register" element={<RegisterUser />} />
        {/* Route for the main app after login */}
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
