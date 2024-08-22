import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Link,
  Container,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { message } from "antd";
import { login } from "../../redux/features/profileSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GuestService from "../../services/Guest.service";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await GuestService.login(username, password);
      console.log(response);
      if (response.data === null) {
        message.error("Sai tên đăng nhập hoặc mật khẩu");
        return;
      }
      const result = response.data;
      await message.success("Đăng nhập thành công");
      await navigate("/");
      await dispatch(login(result.profile));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        <Typography component="h1" variant="h5">
          Welcome back
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            onClick={handleLogin}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Typography component="h1" variant="body2" align="center">
            New to Coursera?{" "}
            <Link
              className="cursor-pointer"
              variant="body2"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
