import React from "react";
import {
  Button,
  TextField,
  Typography,
  Link,
  Container,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
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

          <Typography component="h1" variant="body2" align="center">
            Already have an account?{" "}
            <Link
              className="cursor-pointer"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
