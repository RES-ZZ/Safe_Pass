<<<<<<< Updated upstream
<<<<<<< HEAD
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Box,
  Avatar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5", // Light gray background
    },
    primary: {
      main: "#3f51b5", // Primary color
    },
    secondary: {
      main: "#f50057", // Secondary color
    },
  },
});
=======
import React from "react";
>>>>>>> 47e9237 (testing the new backend logic)

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Here you can add your logic to handle form submission, e.g., sending data to a server
  };

  return (
<<<<<<< HEAD
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white", // White background for the form
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <ContactMailIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Contact Us
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="message"
              label="Message"
              type="message"
              id="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
=======
    <div>
      <h1>Hello World</h1>
    </div>
>>>>>>> 47e9237 (testing the new backend logic)
  );
};

export default Contact;
=======
import Web3 from "web3";
import elliptic from "elliptic";
import { useState } from "react";
import { contractABI } from "../../contractABI";
import { Button, Container, Row, Col, Card, Alert } from "react-bootstrap"; // Bootstrap for UI

const EC = elliptic.ec;
const ec = new EC("secp256k1"); // Same curve used by Ethereum

const About = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [publicKeyX, setPublicKeyX] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [web3, setWeb3] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [message, setMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);

  // Contract address from .env
  const contractAddress = "0x5420491260D3FCA0bFA6aAe0360192E5d60a05f2";

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
      alert("MetaMask not detected. Please install MetaMask!");
    }
  };

  const generateKeyPair = () => {
    const keyPair = ec.genKeyPair();
    const pubKeyX = keyPair.getPublic().getX().toString(16).padStart(64, "0");
    setPublicKeyX(pubKeyX);
    setPrivateKey(keyPair.getPrivate("hex"));
    setAlertMessage("Keys generated successfully!");
  };

  const registerPublicKeyOnChain = async () => {
    if (contract && publicKeyX && web3) {
      try {
        const publicKeyBytes32 = "0x" + publicKeyX.padStart(64, "0");
        await contract.methods.registerUser(publicKeyBytes32).send({
          from: account,
          gas: 300000,
          gasPrice: await web3.eth.getGasPrice(),
        });
        setAlertMessage("Public key registered successfully on-chain!");
      } catch (error) {
        console.error("Error registering public key on-chain:", error.message);
        setAlertMessage("Error: Failed to register public key.");
      }
    }
  };
  const registerPublicKeyWithOrganization = async () => {
    if (!publicKeyX || !account) {
      setAlertMessage("Please generate keys and connect your wallet first.");
      return;
    }

    try {
      const response = await fetch("/api/register-user-onchain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicKey: "0x" + publicKeyX, account }),
      });

      if (response.ok) {
        setAlertMessage(
          "Registration request sent! Organization is processing it."
        );
      } else {
        setAlertMessage("Error: Failed to send registration request.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setAlertMessage("Error: Could not register user.");
    }
  };

  const validateSignatureOffChain = async (message) => {
    if (!web3 || !contract || !account) return;
    try {
      const messageHash = web3.utils.sha3(
        "\x19Ethereum Signed Message:\n" + message.length + message
      );
      const signature = await web3.eth.personal.sign(message, account, "");
      const isValid = await contract.methods
        .validateSignature(messageHash, signature)
        .call();
      setAlertMessage(
        isValid ? "Signature is valid!" : "Signature is invalid."
      );
    } catch (error) {
      console.error("Error validating signature off-chain:", error.message);
      setAlertMessage("Error: Off-chain validation failed.");
    }
  };

  const validateSignatureOnChain = async (message) => {
    if (!web3 || !contract || !account) return;
    try {
      const messageHash = web3.utils.sha3(
        "\x19Ethereum Signed Message:\n" + message.length + message
      );
      await contract.methods
        .recordOffChainValidation(account, messageHash)
        .send({ from: account });
      setAlertMessage("On-chain validation recorded successfully.");
    } catch (error) {
      console.error("Error in on-chain validation:", error.message);
      setAlertMessage("Error: On-chain validation failed.");
    }
  };

  const getAuditLogs = async () => {
    if (!contract) return;
    try {
      const logs = await contract.methods.getAuditLogs().call();
      setAuditLogs(logs);
      setAlertMessage("Audit logs fetched successfully.");
    } catch (error) {
      console.error("Error fetching audit logs:", error.message);
      setAlertMessage("Error: Could not fetch audit logs.");
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4">
        <h2 className="text-center mb-4">Blockchain Authenticator Demo</h2>

        {alertMessage && <Alert variant="info">{alertMessage}</Alert>}

        <Row className="mb-3">
          <Col>
            <Button onClick={connectMetaMask} className="w-100">
              Connect MetaMask
            </Button>
            {account && <p>Connected Account: {account}</p>}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Button onClick={generateKeyPair} className="w-100">
              Generate Key Pair
            </Button>
            {publicKeyX && <p>Public Key: 0x{publicKeyX}</p>}
            {privateKey && <p>Private Key: {privateKey}</p>}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Button onClick={registerPublicKeyOnChain} className="w-100">
              Register Public Key
            </Button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Button
              onClick={registerPublicKeyWithOrganization}
              className="w-100"
            >
              Register Public Key (Paid by Organization)
            </Button>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Button
              onClick={() => validateSignatureOnChain("Test message")}
              className="w-100"
            >
              On-Chain Validation
            </Button>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Button
              onClick={() => validateSignatureOffChain("Test message")}
              className="w-100"
            >
              Off-Chain Validation
            </Button>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Button onClick={getAuditLogs} className="w-100">
              Get Audit Logs
            </Button>
            {auditLogs.length > 0 && (
              <ul>
                {auditLogs.map((log, index) => (
                  <li key={index}>
                    User: {log.user}, Action: {log.action}, Message Hash:{" "}
                    {log.messageHash}
                  </li>
                ))}
              </ul>
            )}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Button
              onClick={() => validateSignatureOnChain(message)}
              className="w-100"
            >
              Validate Signature (On-Chain)
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default About;
>>>>>>> Stashed changes
