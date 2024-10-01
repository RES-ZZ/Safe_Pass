import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Documentation from "./pages/Documentation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Solution from "./pages/Solution";
import Navigation from "./components/Navigation";
import Demo from "./pages/Solution/demo";
import Quick from "./components/quick";
import WhyUs from "./pages/whyUs/WhyUs";
import Tech from "./components/tech";
import Footer from "./components/Footer"; // Import the new Footer component
import ConnectWallet from "./pages/Solution/ConnectWallet";

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
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
