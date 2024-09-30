import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
  Grid,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";

// Custom theme (same as before)
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9945FF",
    },
    background: {
      default: "transparent",
      paper: "rgba(28, 30, 38, 0.8)",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
  },
});

// Keyframes and styled components (same as before)
const twinkle = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const PageWrapper = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
  minHeight: "100vh",
  color: theme.palette.common.white,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
}));

const StarField = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

const Star = styled("div")(({ size, top, left, duration }) => ({
  position: "absolute",
  width: size,
  height: size,
  backgroundColor: "#FFF",
  borderRadius: "50%",
  top: `${top}%`,
  left: `${left}%`,
  animation: `${twinkle} ${duration}s infinite`,
}));

const ContentWrapper = styled(Box)({
  position: "relative",
  zIndex: 1,
});

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "rgba(28, 30, 38, 0.8)",
  borderRadius: theme.shape.borderRadius,
}));

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/mqazrgaj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccessDialog(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    setSuccessDialog(false);
  };

  // Generate random stars
  const stars = Array.from({ length: 100 }, () => ({
    size: Math.random() * 3 + 1 + "px",
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <ThemeProvider theme={darkTheme}>
      <PageWrapper>
        <StarField>
          {stars.map((star, index) => (
            <Star key={index} {...star} />
          ))}
        </StarField>
        <ContentWrapper>
          <Container maxWidth="md">
            <Box sx={{ pt: 8, pb: 6 }}>
              <Typography variant="h1" align="center" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="h5" align="center" paragraph>
                Have questions about our Web3 platform? Get in touch!
              </Typography>
            </Box>
            <FormContainer>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      variant="outlined"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      variant="outlined"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      variant="outlined"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </FormContainer>
          </Container>
        </ContentWrapper>
      </PageWrapper>
      <Dialog
        open={successDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Submitted Successfully!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thank you for your message. We&apos;ll get back to you soon.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ContactPage;
