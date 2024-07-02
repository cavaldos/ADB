import React from "react";
import {
  TextField,
  Button,
  Tabs,
  Tab,
  Avatar,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Avatar
          alt="Sharon Smith"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 80, height: 80 }}
        />
        <div className="ml-4">
          <h2 className="text-2xl font-bold">Sharon Smith</h2>
          <p className="text-gray-500">
            Administrator at iGMS ·{" "}
            <a href="#" className="text-blue-500">
              Leave team
            </a>
          </p>
        </div>
      </div>

      <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
        <Tab label="Personal" />
        <Tab label="Subscription" />
        <Tab label="Notifications" />
        <Tab label="Settings" />
        <Tab label="Websites & Apps" />
        <Tab label="Payments" />
      </Tabs>

      <div className="mt-6">
        {value === 0 && (
          <form>
            <div className="mb-4">
              <div className="flex space-x-4">
                <TextField
                  label="Name"
                  defaultValue="Sharon"
                  variant="outlined"
                  className="flex-1"
                />
                <TextField
                  label="Last Name"
                  defaultValue="Smith"
                  variant="outlined"
                  className="flex-1"
                />
              </div>
            </div>
            <div className="mb-4">
              <TextField
                label="Location"
                defaultValue="Vancouver BC Canada"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Company"
                defaultValue="iGMS"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="mb-4 relative">
              <TextField
                label="Email"
                defaultValue="sharon.smith@igms.com"
                variant="outlined"
                fullWidth
              />
              <IconButton className="absolute top-1/2 right-2 transform -translate-y-1/2">
                <EditIcon />
              </IconButton>
            </div>
            <div className="mb-4 relative">
              <TextField
                label="Phone Number"
                defaultValue="+1 (380) 542-5622"
                variant="outlined"
                fullWidth
              />
              <IconButton className="absolute top-1/2 right-2 transform -translate-y-1/2">
                <EditIcon />
              </IconButton>
            </div>
            <div className="mb-4 relative">
              <TextField
                label="Password"
                type="password"
                defaultValue="password"
                variant="outlined"
                fullWidth
              />
              <IconButton className="absolute top-1/2 right-2 transform -translate-y-1/2">
                <EditIcon />
              </IconButton>
            </div>
            <Button variant="contained" color="primary" fullWidth>
              Save
            </Button>
          </form>
        )}
        {value === 1 && <div>Subscription content...</div>}
        {value === 2 && <div>Notifications content...</div>}
        {value === 3 && <div>Settings content...</div>}
        {value === 4 && <div>Websites & Apps content...</div>}
        {value === 5 && <div>Payments content...</div>}
      </div>
    </div>
  );
};

export default Profile;
