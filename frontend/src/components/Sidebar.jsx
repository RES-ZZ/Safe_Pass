import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar bg-light p-4">
      <h3>Documentation</h3>
      <ul className="list-unstyled">
        <li>
          <Link to="#quick-start">Quick Start</Link>
        </li>
        <li>
          <Link to="#installation">Installation</Link>
        </li>
        <li>
          <Link to="#usage">Usage</Link>
        </li>
        <li>
          <Link to="#faq">FAQ</Link>
        </li>
        <li>
          <Link to="#troubleshooting">Troubleshooting</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
