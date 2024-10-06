import { useState, useEffect } from "react";
import Web3 from "web3";
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Container,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import CssBaseline from "@mui/material/CssBaseline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MenuIcon from "@mui/icons-material/Menu";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import SearchIcon from "@mui/icons-material/Search"; // Import Search icon
import { contractABI } from "../../contractABI"; // Ensure this path is correct

const Admin = () => {
  // State Variables
  const [adminWeb3, setAdminWeb3] = useState(null);
  const [adminAccount, setAdminAccount] = useState(null);
  const [adminRequests, setAdminRequests] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [adminContract, setAdminContract] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Overview");
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

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
  const data = [
    { name: "Jan", users: 400, revenue: 2400 },
    { name: "Feb", users: 300, revenue: 2210 },
    { name: "Mar", users: 500, revenue: 2290 },
    { name: "Apr", users: 600, revenue: 2000 },
    { name: "May", users: 700, revenue: 2780 },
    { name: "Jun", users: 800, revenue: 1890 },
  ];

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

  // Search function
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // You can implement search logic here to filter displayed content based on the search term
  };

  // UI Render
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
                label={`Connected: ${adminAccount.slice(
                  0,
                  6
                )}...${adminAccount.slice(-4)}`}
                color="secondary"
                sx={{ marginRight: 2 }} // Add margin for spacing
              />
            ) : (
              <Button color="inherit" onClick={connectAdminMetaMask}>
                Connect MetaMask
              </Button>
            )}
            <TextField
              variant="outlined"
              placeholder="Search..."
              size="small" // Make the size small
              onChange={handleSearch}
              value={searchTerm}
              sx={{ marginLeft: 2, width: "200px" }} // Adjust width as necessary
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <List>
            <ListItem
              button
              onClick={() => {
                setSelectedSection("Overview");
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Overview" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setSelectedSection("Search");
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setSelectedSection("Profile");
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setSelectedSection("Registration");
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Registration" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setSelectedSection("Analytics");
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setSelectedSection("Recovery");
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Recovery" />
            </ListItem>
          </List>
        </Drawer>

        <Container>
          {alertMessage && (
            <Alert severity="info" onClose={() => setAlertMessage(null)}>
              {alertMessage}
            </Alert>
          )}
          <Grid container spacing={3} style={{ marginTop: "20px" }}>
            <Grid item xs={12}>
              {loading && <CircularProgress />}
              {selectedSection === "Overview" && (
                <Card>
                  <CardContent>
                    <Typography variant="h2">Overview</Typography>
                    {/* Your Overview content here */}
                  </CardContent>
                </Card>
              )}
              {selectedSection === "Search" && (
                <Card>
                  <CardContent>
                    <Typography variant="h2">Search</Typography>
                    <Typography variant="body1">
                      Search term: {searchTerm}
                    </Typography>
                    {/* You can implement search results rendering logic here */}
                  </CardContent>
                </Card>
              )}
              {selectedSection === "Profile" && (
                <Card>
                  <CardContent>
                    <Typography variant="h2">Profile</Typography>
                    {/* Your Profile content here */}
                  </CardContent>
                </Card>
              )}
              {selectedSection === "Registration" && (
                <Card>
                  <CardContent>
                    <Typography variant="h2">Registration Requests</Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>User Address</TableCell>
                            <TableCell>Public Key</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {adminRequests.map((request, index) => (
                            <TableRow key={index}>
                              <TableCell>{request.userAddress}</TableCell>
                              <TableCell>{request.publicKey}</TableCell>
                              <TableCell>
                                {request.approved ? (
                                  <Chip
                                    label="Approved"
                                    color="success"
                                    icon={<CheckCircleIcon />}
                                  />
                                ) : (
                                  <Chip
                                    label="Pending"
                                    color="warning"
                                    icon={<PendingIcon />}
                                  />
                                )}
                              </TableCell>
                              <TableCell>
                                {!request.approved && (
                                  <Button
                                    variant="contained"
                                    onClick={() =>
                                      approveRegistration(
                                        index,
                                        request.userAddress,
                                        request.publicKey
                                      )
                                    }
                                  >
                                    Approve
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              )}
              {selectedSection === "Analytics" && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={4}>
                    <Card
                      sx={{
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" gutterBottom>
                          Total Users
                        </Typography>
                        <Typography variant="h3">1,234</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Card
                      sx={{
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" gutterBottom>
                          Active Users
                        </Typography>
                        <Typography variant="h3">567</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Card
                      sx={{
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" gutterBottom>
                          Price per User
                        </Typography>
                        <Typography variant="h3">$21.75</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Card
                      sx={{
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" gutterBottom>
                          Monthly Revenue
                        </Typography>
                        <Typography variant="h3">$12,345</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Card
                      sx={{
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" gutterBottom>
                          Total Sessions
                        </Typography>
                        <Typography variant="h3">8,765</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" gutterBottom>
                          Bounce Rate
                        </Typography>
                        <Typography variant="h3">25%</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" gutterBottom>
                          Analytics Overview
                        </Typography>
                        <Box sx={{ height: 300 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="users"
                                stroke="#8884d8"
                              />
                              <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#82ca9d"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}
              {selectedSection === "Recovery" && (
                <Card>
                  <CardContent>
                    <Typography variant="h2">Recovery</Typography>
                    {/* Your Recovery content here */}
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Admin;
