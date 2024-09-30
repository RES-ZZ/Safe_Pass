import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// Add this line to the top of your index.js or App.js
import "bootstrap/dist/css/bootstrap.min.css";


import Documentation from "./pages/Documentation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Solution from "./pages/Solution";
import Navigation from "./components/Navigation";
import Quick from "./components/quick";
import Tech from "./components/tech";
import Installation from "./components/installation";
import Faq from "./components/faq";
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
          <Route path="/solution" element={<Solution />} />
          <Route path="/quick-start" element={<Quick />} />
          <Route path="/tech" element={<Tech/>}/>
          <Route path="/installation" element={<Installation/>}/>
          <Route path="/faq" element={<Faq/>}/>
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
