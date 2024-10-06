import { useEffect, useState } from "react";
import Web3 from "web3";
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Container,
  Box,
  Button,
  Alert,
  CircularProgress,
  Chip,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { contractABI } from "../../contractABI"; // Ensure this path is correct
import Overview from './Overview'; // Adjust the path if necessary

const Admin = () => {
  // State Variables
  const [adminWeb3, setAdminWeb3] = useState(null);
  const [adminAccount, setAdminAccount] = useState(null);
  const [adminRequests, setAdminRequests] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [adminContract, setAdminContract] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Network Configuration
  const CELO_ALFAJORES_CONFIG = {
    chainId: "0x" + parseInt(44787).toString(16),
    chainName: "Celo Alfajores Testnet",
    nativeCurrency: { name: "Celo", symbol: "CELO", decimals: 18 },
    rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
    blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.org/"],
  };

  // Contract Address
  const contractAddress = "0x25fAa6922F27B6eAb3E26E866225Bf1d0F8983A9";

  // Theme
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
      background: {
        default: "#f5f5f5",
      },
    },
    typography: {
      h1: {
        fontSize: "2.2rem",
        fontWeight: 500,
      },
      h2: {
        fontSize: "1.8rem",
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
  });

  // Effect Hooks
  useEffect(() => {
    if (adminWeb3) {
      const contractInstance = new adminWeb3.eth.Contract(
        contractABI,
        contractAddress
      );
      setAdminContract(contractInstance);
    }
  }, [adminWeb3]);

  useEffect(() => {
    const storedRequests =
      JSON.parse(localStorage.getItem("registrationRequests")) || [];
    setAdminRequests(storedRequests);
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "registrationRequests") {
        const updatedRequests = JSON.parse(event.newValue) || [];
        setAdminRequests(updatedRequests);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Functions
  const connectAdminMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      let metamaskProvider;

      if (window.ethereum.providers) {
        metamaskProvider = window.ethereum.providers.find(
          (provider) => provider.isMetaMask
        );
      } else if (window.ethereum.isMetaMask) {
        metamaskProvider = window.ethereum;
      }

      if (metamaskProvider) {
        try {
          await metamaskProvider.request({ method: "eth_requestAccounts" });

          try {
            await metamaskProvider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: CELO_ALFAJORES_CONFIG.chainId }],
            });
          } catch (switchError) {
            if (switchError.code === 4902) {
              await metamaskProvider.request({
                method: "wallet_addEthereumChain",
                params: [CELO_ALFAJORES_CONFIG],
              });
            } else {
              throw switchError;
            }
          }

          const web3Instance = new Web3(metamaskProvider);
          setAdminWeb3(web3Instance);

          const accounts = await web3Instance.eth.getAccounts();
          setAdminAccount(accounts[0]);

          setAlertMessage("Admin MetaMask Connected to Celo Alfajores!");
        } catch (error) {
          console.error("Connection error", error);
          setAlertMessage(`Error: ${error.message}`);
        }
      } else {
        setAlertMessage(
          "MetaMask not detected. Please install the MetaMask extension."
        );
      }
    } else {
      setAlertMessage(
        "MetaMask not detected. Please install the MetaMask extension."
      );
    }
  };

  const approveRegistration = async (requestIndex, userAddress, publicKey) => {
    if (!adminAccount) {
      setAlertMessage("Error: Admin must connect MetaMask.");
      return;
    }

    if (!adminContract) {
      setAlertMessage("Error: Admin contract instance not available.");
      return;
    }

    try {
      setLoading(true);
      setAlertMessage(`Approving registration for ${userAddress}...`);

      let publicKeyBytes32 = publicKey.startsWith("0x")
        ? publicKey
        : "0x" + publicKey;
      if (publicKeyBytes32.length !== 66) {
        throw new Error("Invalid public key length.");
      }

      let gasEstimate;
      try {
        gasEstimate = await adminContract.methods
          .registerUser(userAddress, publicKeyBytes32)
          .estimateGas({ from: adminAccount });
      } catch (gasError) {
        console.error("Gas estimation failed:", gasError);
        setAlertMessage("Error: Gas estimation failed. Transaction may fail.");
        setLoading(false);
        return;
      }

      const calculateGasLimit = (estimate) => {
        return typeof estimate === "bigint"
          ? ((estimate * 120n) / 100n).toString()
          : Math.floor(estimate * 1.2);
      };

      const gasLimit = calculateGasLimit(gasEstimate);

      const result = await adminContract.methods
        .registerUser(userAddress, publicKeyBytes32)
        .send({
          from: adminAccount,
          gas: gasLimit,
        });

      console.log("Transaction result:", result);

      setAlertMessage(`Registration approved for ${userAddress}!`);

      const existingRequests =
        JSON.parse(localStorage.getItem("registrationRequests")) || [];
      existingRequests[requestIndex].approved = true;
      localStorage.setItem(
        "registrationRequests",
        JSON.stringify(existingRequests)
      );

      setAdminRequests(existingRequests);
    } catch (error) {
      console.error("Error approving registration:", error);
      setAlertMessage(
        `Error: Failed to approve registration. ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // UI Render
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            {adminAccount ? (
              <Chip
                label={`Connected: ${adminAccount.slice(0, 6)}...${adminAccount.slice(-4)}`}
                color="secondary"
              />
            ) : (
              <Button color="inherit" onClick={connectAdminMetaMask}>
                Connect MetaMask
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <List>
            <ListItem button onClick={() => { setSelectedSection('Overview'); setDrawerOpen(false); }}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Overview" />
            </ListItem>
            <ListItem button onClick={() => { setSelectedSection('Profile'); setDrawerOpen(false); }}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </List>
          <Divider />
        </Drawer>

        <Container sx={{ mt: 3 }}>
          {alertMessage && (
            <Alert onClose={() => setAlertMessage(null)} severity={loading ? "info" : "success"}>
              {alertMessage}
            </Alert>
          )}

          <Box>
            {loading ? (
              <CircularProgress />
            ) : adminRequests.length === 0 ? (
              <Typography variant="h6">No registration requests available.</Typography>
            ) : selectedSection === 'Overview' ? (
              <Overview 
                adminRequests={adminRequests} 
                approveRegistration={approveRegistration} 
                searchQuery={searchQuery} 
                handleSearch={handleSearch}
              />
            ) : (
              <Typography variant="h4">Profile Section (to be implemented)</Typography>
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Admin;
