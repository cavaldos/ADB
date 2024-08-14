import React, { useEffect } from "react";


import { useSelector, useDispatch } from "react-redux";
import ChatBox from "../../components/Chat/ChatBox";
import ChatUserList from "../../components/Chat/ChatUserList";

const LearningProcess = () => {
  return (
    <div className="flex h-[85vh] bg-gray-100 rounded-xl mx-20  gap-4 ">
      <ChatUserList />
      <div className=" shadow-md rounded-lg  w-full">
        <ChatBox />
      </div>
    </div>
  );
};

export default LearningProcess;
