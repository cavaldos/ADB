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
import { login, setRole } from "~/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function SignIn() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    if (username == "a") {
      console.log("admin", username, password);
      dispatch(setRole("admin"));
      navigate("/");
      console.log("sdafasdf");
      return;
    }
    if (username == "i") {
      dispatch(setRole("instructor"));
      navigate("/");
      return;
    }
    if (username == "s") {
      dispatch(setRole("student"));
      navigate("/");
      return;
    } else {
      dispatch(setRole("guest"));
      return;
    }
  };

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
        <h1>
          bấm chữ "a" or "i" or "s" để đăng nhập vào admin, instructor, student
        </h1>
        <h1 className=" text-ret">
         KHÔNG CẦN MẬT KHẨU
        </h1>
        <Typography component="h1" variant="h5">
          Welcome back
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)} // capture input
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // capture input
          />
          <Link className="cursor-pointer" variant="body2">
            Forgot password?
          </Link>
          <Button
            onClick={handleLogin}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            SignIn
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
            New to Coursera? <Link href="#">Sign up</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
