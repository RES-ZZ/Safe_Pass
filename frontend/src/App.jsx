import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Documentation from "./pages/Documentation";
import About from "./pages/About/index";
import Contact from "./pages/Contact";
import Solution from "./pages/Solution";
import Navigation from "./components/Navigation";
import Demo from "./pages/Solution/demo";
import Quick from "./components/quick";
import Tech from "./components/tech";
import Footer from "./components/Footer"; // Import the new Footer component
import ConnectWallet from "./pages/Solution/ConnectWallet";
import RegistrationPage from "./pages/Solution/Register";
import AdminPage from "./pages/Solution/Admin";
import User from "./pages/Solution/User1";
function App() {
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
          
            <Route path="/connect-wallet" element={<ConnectWallet />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/user" element={<User />} /> {/* Add the User route */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;