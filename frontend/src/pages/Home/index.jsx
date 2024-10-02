import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";

// Custom theme
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
      fontSize: "3.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
    },
  },
});

// Keyframes for star twinkling
const twinkle = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

// Styled components
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

const GlowingCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: `0 0 20px ${theme.palette.primary.main}`,
    transform: "translateY(-5px)",
  },
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height: "100%",
}));

const HomePage = () => {
  const performanceData = [
    { title: "Scalabale,Immutable", value: "200%" },
    { title: "Transactions speed", value: "Under 1 sec" },
    { title: "Decentralised", value: "200%" },
    { title: "Secure", value: "84B" },
  ];

  const testimonials = [
    {
      name: "Vishnu",
      role: "DeFi Developer",
      quote:
        "The speed and scalability of this platform have revolutionized our DApp development process.",
    },
    {
      name: "Ram Kumar",
      role: "Crypto Investor",
      quote:
        "I've never seen such low transaction fees coupled with lightning-fast confirmations. It's a game-changer.",
    },
    {
      name: "Dinesh",
      role: "NFT Artist",
      quote:
        "The vibrant community and robust infrastructure make this the perfect home for my digital art collections.",
    },
  ];

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
          <Container maxWidth="lg">
            <Box sx={{ pt: 15, pb: 8, textAlign: "center" }}>
              <Typography variant="h1" gutterBottom>
                Welcome to the Future of Web3
              </Typography>
              <Typography variant="h5" paragraph>
                Experience lightning-fast transactions, unparalleled security,
                and limitless scalability.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
              >
                Get Started
              </Button>
            </Box>

            <Box sx={{ mb: 8 }}>
              <Typography variant="h2" gutterBottom align="center">
                Performance Metrics
              </Typography>
              <Grid container spacing={4} sx={{ mt: 4 }}>
                {performanceData.map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <GlowingCard>
                      <CardContent>
                        <Typography variant="h3" color="primary">
                          {item.value}
                        </Typography>
                        <Typography variant="subtitle1">
                          {item.title}
                        </Typography>
                      </CardContent>
                    </GlowingCard>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ py: 8 }}>
              <Typography variant="h2" gutterBottom align="center">
                What Our Users Say
              </Typography>
              <Grid container spacing={4} sx={{ mt: 4 }}>
                {testimonials.map((testimonial, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <TestimonialCard>
                      <CardContent>
                        <Typography variant="body1" paragraph>
                          &quot;{testimonial.quote}&quot;
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2">
                          {testimonial.role}
                        </Typography>
                      </CardContent>
                    </TestimonialCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </ContentWrapper>
      </PageWrapper>
    </ThemeProvider>
  );
};

export default HomePage;
