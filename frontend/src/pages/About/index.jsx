import { useState } from "react";
import Web3 from "web3";
import {
  Typography,
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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

const About = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Replace with your deployed contract address
  const contractAddress = "0x71110c8e6bad31432E1dCEF1AD0e7e46F88F868B";
  const contractABI = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "username",
          type: "string",
        },
      ],
      name: "UserRegistered",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "username",
          type: "string",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "success",
          type: "bool",
        },
      ],
      name: "UserValidated",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "username",
          type: "string",
        },
        {
          internalType: "bytes32",
          name: "passwordHash",
          type: "bytes32",
        },
      ],
      name: "registerUser",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "username",
          type: "string",
        },
        {
          internalType: "bytes32",
          name: "passwordHash",
          type: "bytes32",
        },
      ],
      name: "validateUser",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const connectMetaMask = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);

        const contractInstance = new web3Instance.eth.Contract(
          contractABI,
          contractAddress
        );
        setContract(contractInstance);
        setAlertMessage("MetaMask Connected!");
      } catch (error) {
        console.error("User denied account access", error);
        setAlertMessage("Error: User denied account access.");
      }
    } else {
      setAlertMessage("MetaMask not detected. Please install MetaMask!");
    }
  };

  const registerUser = async () => {
    if (contract && web3 && username && password) {
      try {
        await contract.methods
          .registerUser(username, web3.utils.sha3(password))
          .send({
            from: account,
            gas: 300000,
            gasPrice: await web3.eth.getGasPrice(),
          });
        setAlertMessage("User registered successfully!");
      } catch (error) {
        console.error("Error registering user:", error.message);
        setAlertMessage("Error: Failed to register user.");
      }
    } else {
      setAlertMessage(
        "Please connect MetaMask and enter username and password."
      );
    }
  };

  const validateOnChain = async () => {
    if (contract && web3 && username && password) {
      try {
        const isValid = await contract.methods
          .validateUser(username, web3.utils.sha3(password))
          .call();
        setAlertMessage(
          isValid ? "Validation successful!" : "Validation failed."
        );
      } catch (error) {
        console.error("Error validating user:", error.message);
        setAlertMessage("Error: Validation failed.");
      }
    } else {
      setAlertMessage(
        "Please connect MetaMask and enter username and password."
      );
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Blockchain Authenticator
          </Typography>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Part 1: Registration
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={connectMetaMask}
                  >
                    Connect MetaMask
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={registerUser}
                  >
                    Register User
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Part 2: Validate On-Chain
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={validateOnChain}
                  >
                    Validate On-Chain
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Container>
      <Snackbar
        open={!!alertMessage}
        autoHideDuration={6000}
        onClose={() => setAlertMessage(null)}
        message={alertMessage}
      />
    </ThemeProvider>
  );
};

export default About;
