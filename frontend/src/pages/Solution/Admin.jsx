import { useState, useEffect } from "react";
import Web3 from "web3";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { contractABI } from "../../contractABI"; // Ensure this path is correct

const Admin = () => {
  // State Variables
  const [adminWeb3, setAdminWeb3] = useState(null);
  const [adminAccount, setAdminAccount] = useState(null);
  const [adminRequests, setAdminRequests] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Network Configuration
  const CELO_ALFAJORES_CONFIG = {
    chainId: "0x" + parseInt(44787).toString(16), // 44787 is the decimal chain ID for Alfajores
    chainName: "Celo Alfajores Testnet",
    nativeCurrency: { name: "Celo", symbol: "CELO", decimals: 18 },
    rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
    blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.org/"],
  };

  // Contract Address (Replace with your deployed contract address)
  const contractAddress = "0x25fAa6922F27B6eAb3E26E866225Bf1d0F8983A9";
  console.log("hello :" + import.meta.env.VITE_TEST_VARIABLE); // Should output "Hello World"

  // Contract Instances
  const [adminContract, setAdminContract] = useState(null);
  console.log("Contract Address:", import.meta.env.VITE_CONTRACT_ADDRESS);

  // Initialize Contract Instances
  useEffect(() => {
    if (adminWeb3) {
      const contractInstance = new adminWeb3.eth.Contract(
        contractABI,
        contractAddress
      );
      setAdminContract(contractInstance);
    }
  }, [adminWeb3]);

  // Load Registration Requests from Local Storage
  useEffect(() => {
    const storedRequests =
      JSON.parse(localStorage.getItem("registrationRequests")) || [];
    setAdminRequests(storedRequests);
  }, []);

  // Listen to Registration Requests in Local Storage
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

  // Admin: Connect MetaMask
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
          // Request account access
          await metamaskProvider.request({ method: "eth_requestAccounts" });

          // Switch to Celo Alfajores network
          try {
            await metamaskProvider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: CELO_ALFAJORES_CONFIG.chainId }],
            });
          } catch (switchError) {
            if (switchError.code === 4902) {
              // Chain not added, add it
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

  // Admin: Approve Registration
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

      // Ensure publicKey is a valid bytes32
      let publicKeyBytes32 = publicKey.startsWith("0x")
        ? publicKey
        : "0x" + publicKey;
      if (publicKeyBytes32.length !== 66) {
        throw new Error("Invalid public key length.");
      }

      // Estimate gas for the transaction
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

      // Function to calculate gas limit with an extra 20%
      const calculateGasLimit = (estimate) => {
        if (typeof estimate === "bigint") {
          // Use BigInt arithmetic
          return ((estimate * 120n) / 100n).toString();
        } else {
          // Use Number arithmetic
          return Math.floor(estimate * 1.2);
        }
      };

      const gasLimit = calculateGasLimit(gasEstimate);

      // Approve the user registration on-chain
      const result = await adminContract.methods
        .registerUser(userAddress, publicKeyBytes32)
        .send({
          from: adminAccount,
          gas: gasLimit,
        });

      console.log("Transaction result:", result);

      setAlertMessage(`Registration approved for ${userAddress}!`);

      // Update local storage to mark as approved
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

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#f48fb1",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" align="center" gutterBottom>
            🛡️ Admin Panel (MetaMask)
          </Typography>

          {alertMessage && (
            <Alert severity="info" sx={{ mb: 2 }}>
              {alertMessage}
            </Alert>
          )}

          <Card>
            <CardHeader
              title="🔗 Connect MetaMask"
              sx={{ bgcolor: "success.main", color: "success.contrastText" }}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={connectAdminMetaMask}
                  >
                    🔗 Connect MetaMask
                  </Button>
                </Grid>
                {adminAccount && (
                  <Grid item xs={12}>
                    <Alert severity="success">
                      Admin Account: {adminAccount}
                    </Alert>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom>
                    Registration Requests
                  </Typography>
                  {adminRequests.length === 0 ? (
                    <Alert severity="info">No pending requests.</Alert>
                  ) : (
                    adminRequests.map((request, index) => (
                      <Paper key={index} elevation={2} sx={{ p: 2, mb: 2 }}>
                        <Typography variant="h6">{request.username}</Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Public Key:</strong>{" "}
                          <span style={{ wordBreak: "break-all" }}>
                            {request.publicKey}
                          </span>
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>User Address:</strong> {request.userAddress}
                        </Typography>
                        {request.approved ? (
                          <Alert severity="success" sx={{ mt: 1 }}>
                            Approved
                          </Alert>
                        ) : (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() =>
                              approveRegistration(
                                index,
                                request.userAddress,
                                request.publicKey
                              )
                            }
                            disabled={loading}
                            sx={{ mt: 1 }}
                          >
                            {loading ? (
                              <CircularProgress size={24} />
                            ) : (
                              "Approve"
                            )}
                          </Button>
                        )}
                      </Paper>
                    ))
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Admin;