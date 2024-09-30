import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// Add this line to the top of your index.js or App.js
import "bootstrap/dist/css/bootstrap.min.css";

import Documentation from "./pages/Documentation";
import About from "./pages/About";
<<<<<<< HEAD
import Contact from "./pages/Contact";
import Navigation from "./components/Navigation";
import Demo from "./pages/Solution/Demo";
import Option2Page from "./pages/Solution/Option2";
=======
import Contact from "./index1";
import Solution from "./pages/Solution";
import Navigation from "./components/Navigation";
import NotContact from "./index1";
>>>>>>> 47e9237 (testing the new backend logic)

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
<<<<<<< HEAD
          <Route path="/solution/Demo" element={<Demo />} />
          <Route path="/solution/option2" element={<Option2Page />} />
=======
          <Route path="/solution" element={<Solution />} />
          <Route patth="/notcontact" element={<NotContact />} />
>>>>>>> 47e9237 (testing the new backend logic)
        </Routes>
      </div>
    </Router>
  );
}

export default App;
