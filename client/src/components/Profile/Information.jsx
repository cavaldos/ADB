import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
  Modal,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Information = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "Sharon",
    lastName: "Smith",
    location: "Vancouver BC Canada",
    company: "iGMS",
    email: "sharon.smith@igms.com",
    phoneNumber: "+1 (380) 542-5622",
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordModalToggle = () => {
    setPasswordModalOpen(!passwordModalOpen);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <form>
        <div className="mb-4">
          <div className="flex space-x-4">
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              className="flex-1"
              InputProps={{
                readOnly: !isEditing,
              }}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              variant="outlined"
              className="flex-1"
              InputProps={{
                readOnly: !isEditing,
              }}
            />
          </div>
        </div>
        <div className="mb-4">
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: !isEditing,
            }}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: !isEditing,
            }}
          />
        </div>
        <div className="mb-4 relative">
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: !isEditing,
            }}
          />
        </div>
        <div className="mb-4 relative">
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: !isEditing,
            }}
          />
        </div>
        <div className="mb-4 relative">
          <TextField
            label="Password"
            type="password"
            name="password"
            value="password"
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <IconButton
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            onClick={handlePasswordModalToggle}
          >
            <EditIcon />
          </IconButton>
        </div>
        {isEditing ? (
          <Button
            size="small"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleEditToggle}
          >
            Save
          </Button>
        ) : (
          <Button
            size="small"
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleEditToggle}
          >
            Edit
          </Button>
        )}
      </form>

      <Modal open={passwordModalOpen} onClose={handlePasswordModalToggle}>
        <Box className="flex flex-col gap-2" sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Change Password
          </Typography>
          <TextField
            label="New Password"
            type={showPassword ? "text" : "password"}
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            variant="outlined"
            fullWidth
            className="mb-2"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            variant="outlined"
            fullWidth
            className="mb-2"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePasswordModalToggle}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Information;
