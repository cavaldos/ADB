import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Link,
  Container,
  Box,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import GuestService from "../../services/Guest.service";
import { message } from "antd";
function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState("Student"); // Default role selection

  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    username: "",
    password: "",
  });

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await GuestService.register(
        formData.username,
        formData.password,
        formData.email,
        formData.fullname,
        formData.phone,
        formData.address,
        role
      );
      if (response.status === 200) {
        await message.success("Đăng ký thành công");
        await navigate("/signin");
        return;
      } else {
        message.error("Đăng ký thất bại");
        return;
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
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
          Create an account
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSignUp}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullname"
            label="Full Name"
            name="fullname"
            autoComplete="fullname"
            autoFocus
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            autoComplete="phone"
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            autoComplete="address"
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="name"
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
          {/* Role Selection */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role"
              value={role}
              onChange={handleRoleChange}
              label="Role"
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Instructor">Instructor</MenuItem>
            </Select>
          </FormControl>
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
