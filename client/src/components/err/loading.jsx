import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="500px"
    >
      <CircularProgress size={60} />
    </Box>
  );
};

export default Loading;
