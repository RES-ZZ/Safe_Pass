import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/documentation">
          Documentation
        </Button>
        <Button color="inherit" component={Link} to="/about">
          About
        </Button>
        <Button color="inherit" component={Link} to="/contact">
          Contact
        </Button>
        <Button color="inherit" component={Link} to="/solution">
          Solution
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default Navigation;
