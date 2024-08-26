import React, { useState, useEffect } from "react";
import { LuBell } from "react-icons/lu";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import { Typography, Card } from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

const Notifications = () => {
  return (
    <Card className="mt-6 w-96 p-3 bg-gray-50 hover:bg-gray-100">
      <Badge
        variant="dot"
        invisible={false}
        color="error"
        sx={{ color: "black" }}
        onClick={() => {
          alert("Notification Clicked");
        }}
      >
        <div className="flex items-center justify-between">
          <Typography color="gray">Notifications</Typography>
          <Typography color="gray">Mark all as read</Typography>
          <FaCheck className="text-green-500" />
        </div>
      </Badge>
    </Card>
  );
};

function Notify() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className=" mr-2 p-2 ">
      <Badge
        badgeContent={1}
        invisible={false}
        color="error"
        sx={{ color: "black" }}
        onClick={toggleDrawer}
      >
        <LuBell className="text-xl text-black hover:text-gray-600" />
      </Badge>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="p-3 px-5 min-w-[400px]">
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Notifications
            </Typography>
            <IoClose
              className="text-3xl cursor-pointer"
              onClick={toggleDrawer}
            />
          </div>
          <div className="space-y-4 overflow-y-hidden flex flex-col">
            <Notifications />
            <Notifications />
            <Notifications />
            <Notifications />
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default Notify;
