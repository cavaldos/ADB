import React from "react";
import {
  Button,
  TextField,
  Typography,
  Link,
  Container,
  Box,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";

function SignUp() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Create an account
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Typography component="h1" variant="h5" align="center">
            or
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            startIcon={<GoogleIcon />}
            sx={{ mt: 1, mb: 1 }}
          >
            Continue with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            startIcon={<FacebookIcon />}
            sx={{ mb: 1 }}
          >
            Continue with Facebook
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            startIcon={<AppleIcon />}
            sx={{ mb: 1 }}
          >
            Continue with Apple
          </Button>
          <Typography component="h1" variant="body2" align="center">
            Already have an account? <Link href="#">Sign in</Link>
          </Typography>
          <Link href="#" variant="body2" align="center">
            Log in with your organization
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
