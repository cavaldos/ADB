import React, { useRef, useState } from "react";
import Advertisement from "../../components/Course/Advertisement";
import AllCoursePage from "../../components/Course/AllCoursePage";

const GuestPage = () => {
  return (
    <div>
      <Advertisement />
      <AllCoursePage />
    </div>
  );
};

export default GuestPage;
