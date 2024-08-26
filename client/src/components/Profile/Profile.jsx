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
import Information from "./Information";
import Education from "./Education";
import Company from "./Company";
import Certificate from "./Certificate";
import Finance from "./Finance";

const Profile = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <div className="flex items-center mb-6">
        <Avatar
          alt="Sharon Smith"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 80, height: 80 }}
        />
        <div className="ml-4">
          <h2 className="text-2xl font-bold">Sharon Smithsss</h2>
          <p className="text-gray-500">
            Administrator at iGMS ·{" "}
            <a href="#" className="text-blue-500">
              Leave team
            </a>
          </p>
        </div>
      </div>

      <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
        <Tab label="Information" />
        <Tab label="Education" />
        <Tab label="Company" />
        <Tab label="Certificate" />
        <Tab label="Finance" />
      </Tabs>

      <div className="mt-6">
        {value === 0 && <Information />}
        {value === 1 && <Education />}
        {value === 2 && <Company />}
        {value === 3 && <Certificate />}
        {value === 4 && <Finance />}
      </div>
    </div>
  );
};

export default Profile;
