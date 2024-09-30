import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Container, Typography, Box, Grid, Card, CardContent } from "@mui/material";

// Create a custom black theme
const blackTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6200EA",
    },
    secondary: {
      main: "#FF5722",
    },
    background: {
      default: "#000000",
      paper: "#121212",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
  },
});

const Demo = () => {
  return (
    <ThemeProvider theme={blackTheme}>
      <Box sx={{ backgroundColor: "#000000", minHeight: "100vh", paddingTop: 8 }}>
        <Container maxWidth="sm">
          <Box sx={{ textAlign: "center"}}>
          <Typography variant="h4" color="#ffffff" gutterBottom>
              Welcome to Our Demo Page
            </Typography>
            <Typography variant="subtitle1" color="#ffffff" gutterBottom>
              Explore the features and functionalities of our platform.
            </Typography>
            <Grid container spacing={4} direction="column" alignItems="center">
              <Grid item>
                <Card sx={{ minWidth: 275, backgroundColor: "#1E1E1E" }}>
                  <CardContent>
                    <Typography variant="h5" color="textPrimary">
                      Connect Meta Mask
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ marginTop: 1 }}>
                      connect
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card sx={{ minWidth: 275, backgroundColor: "#1E1E1E" }}>
                  <CardContent>
                    <Typography variant="h5" color="textPrimary">
                      Generate Key Pair
                    </Typography>
                    <Button variant="contained" color="secondary" sx={{ marginTop: 1 }}>
                      generate
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card sx={{ minWidth: 275, backgroundColor: "#1E1E1E" }}>
                  <CardContent>
                    <Typography variant="h5" color="textPrimary">
                      Register Public Key
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ marginTop: 1 }}>
                      register
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Demo;