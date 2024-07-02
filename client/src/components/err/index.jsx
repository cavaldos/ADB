import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container, Box } from "@mui/material";

const NotfoundError = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate(-1);
    }
  }, [countdown, navigate]);

  const handleMoveHome = () => {
    navigate("/");
  };

  return (
    <Container className="flex flex-col items-center justify-center h-screen">
      <Box textAlign="center">
        <Typography variant="h1" component="div" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Redirecting to home in{" "}
          <Typography component="span" color="error">
            {countdown}
          </Typography>{" "}
          seconds...
        </Typography>
        <Button variant="contained" color="primary" onClick={handleMoveHome}>
          Back Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotfoundError;
