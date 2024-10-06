// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./main.css";
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";
import About from "./pages/About/index";
import Contact from "./pages/Contact";
import Solution from "./pages/Solution";
import Navigation from "./components/Navigation";
import Demo from "./pages/Solution/demo";
import Quick from "./components/quick";
import Tech from "./components/tech";
import Footer from "./components/Footer"; // Import the new Footer component
import RegistrationPage from "./pages/Solution/Register";
import Admin from "./pages/Solution/Admin";
import Chat from "./pages/Solution/Chat";
import User from "./File Transfer/User";
import Overview from "./pages/Solution/Overview";
import ThreeFa from "./pages/Solution/ThreeFa";
import Analytics from "./pages/Solution/Analytics";
import Sidebar1 from "./components/Sidebar1";
import Layout from "./pages/Solution/Layout";
import Navbar from "./components/Navbar";
import RegistrationRequests from "./pages/Solution/RegistrationRequests";
// import FileUploader from "./components/FileUploader";
// import FileViewer from "./components/FileViewer";

function App() {
  const [contractAddress] = useState(
    "0x07A253775c53a5cC2BCecD6F3dFcEE65866b911F"
  );

  return (
    <Router>
      <div
        className="App"
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navigation />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/solution" element={<Solution />} />
            <Route path="/quick-start" element={<Quick />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/user" element={<User />} />
            <Route path="/three-fa" element={<ThreeFa />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route
              path="/registration-requests"
              element={<RegistrationRequests />}
            />
            <Route path="/layout" element={<Layout />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/sidebar1" element={<Sidebar1 />} />

            <Route
              path="/chat"
              element={<Chat contractAddress={contractAddress} />}
            />

            {/* <Route path="/message-viewer" element={<MessageViewer />} /> */}
            {/* <Route path="/message-sender" element={<MessageSender />} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
