import { Dropdown } from "react-bootstrap";
const Home = () => {
  console.log("Home Page");

  return (
    <div className="dropdown">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Ramkumar
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Good</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Bad</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Pro</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Home;
