import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
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
    <div className="error flex justify-center flex-col ">
      <Result
        status="404"
        title={<h1 className=" text-6xl">404</h1>}
        subTitle={
          <div className="mx-auto">
            Redirecting to home in{" "}
            <p className="text-red-700 text-lg"> {countdown} </p>
            seconds...
          </div>
        }
        extra={
          <Button
            type="primary"
            className="bg-blue-600 "
            onClick={handleMoveHome}
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotfoundError;
