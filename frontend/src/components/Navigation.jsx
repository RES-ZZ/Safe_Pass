import { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Menu, MenuItem } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", // Purple primary color
    },
    secondary: {
      main: "#EBD3F8", // Secondary color
    },
    background: {
      default: "#000000", // Dark background for the navbar
    },
    text: {
      primary: "#ffffff", // White text color
    },
  },
});

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSolutionClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "center", gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.secondary.main, // Hover color
              },
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/documentation"
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.secondary.main, // Hover color
              },
            }}
          >
            Documentation
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/about"
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.secondary.main, // Hover color
              },
            }}
          >
            About
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/contact"
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.secondary.main, // Hover color
              },
            }}
          >
            Contact
          </Button>
          <Button
            color="inherit"
            onClick={handleSolutionClick}
            aria-controls="solution-menu"
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl)}
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.secondary.main, // Hover color
              },
            }}
          >
            Solution
          </Button>
          <Menu
            id="solution-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            role="menu"
            PaperProps={{
              style: {
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
              },
            }}
          >
            <MenuItem
              component={Link}
              to="/solution/Demo"
              onClick={handleClose}
              role="menuitem"
            >
              Demo
            </MenuItem>
            <MenuItem
              component={Link}
              to="/solution/option2"
              onClick={handleClose}
              role="menuitem"
            >
              Option 2
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navigation;
