import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navigation from "./components/Navigation";
import Demo from "./pages/Solution/Demo";
import Option2Page from "./pages/Solution/Option2";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/solution/Demo" element={<Demo />} />
          <Route path="/solution/option2" element={<Option2Page />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
