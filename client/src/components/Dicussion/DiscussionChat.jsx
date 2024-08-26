import React, { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { Avatar, Space } from "antd";
import Tooltip from "@mui/material/Tooltip";
import { UserOutlined } from "@ant-design/icons";
import PublicService from "../../services/Public.service";
import { ConvertTime } from "../../hooks/Time.utils";
import { useSelector, useDispatch } from "react-redux";
// import { setForumID } from "../../redux/features/globalState";

const MessageForum = ({ message }) => {
  const myId = 1; // lay my tu redux
  const firstLetter = (name) => name.charAt(0).toUpperCase();
  const myMessage = message.SenderID === myId;
  const GuestMessage = () => {
    return (
      <div className="flex flex-col rounded-md mb-1">
        <div className={`p-2 gap-1my-auto`}>
          <Tooltip
            title={`${message.ForumMessageID} - ${ConvertTime.convertTimeToHHMM(
              message.SendTime
            )} - ${message.SenderName}`}
            arrow
            placement="top-start"
          >
            <Avatar className="mr-2 mt-auto">
              {firstLetter(message.SenderName)}
            </Avatar>
          </Tooltip>
          <Tooltip
            title={`${message.ForumMessageID} - ${ConvertTime.convertTimeToHHMM(
              message.SendTime
            )} - ${message.SenderName}`}
            arrow
            placement="right-start"
          >
            <div
              className={`inline-block py-1 px-2 min-h-5 my-auto min-w-[40px] rounded-md  max-w-[70%] break-words text-left bg-gray-300 text-black `}
            >
              {message.MessageContent}
            </div>
          </Tooltip>
        </div>
      </div>
    );
  };
  const MyMessage = () => {
    return (
      <div className="flex flex-col rounded-md mb-1 ">
        <div className={`p-2 gap-1 flex justify-end my-auto`}>
          <Tooltip
            title={`${message.ForumMessageID} - ${ConvertTime.convertTimeToHHMM(
              message.SendTime
            )} - ${message.SenderName}`}
            arrow
            placement="left-start"
          >
            <div
              className={`inline-block py-1 px-2 min-h-5 my-auto min-w-[40px] rounded-md  max-w-[70%] break-words text-left bg-gray-400 text-black `}
            >
              {message.MessageContent}
            </div>
          </Tooltip>
          <Tooltip
            title={`${message.ForumMessageID} - ${ConvertTime.convertTimeToHHMM(
              message.SendTime
            )} - ${message.SenderName}`}
            arrow
            placement="top-start"
          >
            <Avatar className="mr-2 mt-auto">
              {firstLetter(message.SenderName)}
            </Avatar>
          </Tooltip>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {myMessage ? <GuestMessage /> : <MyMessage />}
    </div>
  );
};

function DiscussionChat() {
  const [loading, setLoading] = useState(false);
  const [forumMesage, setForumMessage] = useState([]);
  const [messageFR, setMessageFR] = useState("");
  const idForum = useSelector((state) => state.globalState.forumID);
  const profile = useSelector((state) => state.profile);
  const fetchForumMessage = async () => {
    setLoading(true);
    try {
      const response = await PublicService.Forum.getAllMesForum(idForum);
      setForumMessage(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchForumMessage();
  }, []);

  const sendForumMessage = async () => {
    console.log(messageFR, idForum, profile.UserID);
    const res = await PublicService.Forum.sendForumMessage(
      idForum,
      messageFR,
      profile.UserID
    );
    if (res.status === 200) {
      setMessageFR("");
      fetchForumMessage();
    }
  };

  const containerRef = useRef(null);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;

      // Kiểm tra nếu đã cuộn đến cuối
      if (scrollTop + clientHeight >= scrollHeight) {
        // Ngăn cuộn thêm
        container.style.overflowY = "hidden";
      } else {
        // Cho phép cuộn nếu chưa đến cuối
        container.style.overflowY = "auto";
      }
    }
  };

  return (
    <>
      <div
        className="w-full flex flex-col rounded-md  relative h-[100%] overflow-hidden"
        onScroll={handleScroll}
        ref={containerRef}
      >
        <div
          className="bg-white p-1 rounded-md h-[80px]  opacity-65 bg-opacity-95
        flex items-center shadow-xl  shadow-blur backdrop-blur-2xl overflow-hidden"
        ></div>
        <div className="flex-1 overflow-y-auto rounded-t-lg p-2 relative h-full pb-24 ">
          {loading && (
            <div className="flex justify-left items-left">
              <span className="loading loading-dots loading-md"></span>
            </div>
          )}
          {!loading &&
            forumMesage?.map((discussion, index) => (
              <MessageForum key={index} message={discussion} />
            ))}
        </div>
        <div className="bg-white flex border rounded-3xl absolute bottom-4 right-4 left-4  min-w-auto shadow-2xl ">
          <input
            type="text"
            className="rounded-3xl w-full py-2 px-3 text-gray-700 focus:outline-none  
            overflow-hidden break-words bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200  "
            placeholder="Type a message"
            value={messageFR}
            onChange={(e) => setMessageFR(e.target.value)}
          />

          <button
            onClick={sendForumMessage}
            className="ml-2 p-2 bg-blue-500 rounded-lg"
          >
            <IoSend className="hover:text-gray-950 text-gray-800" size={24} />
          </button>
        </div>
      </div>
    </>
  );
}

export default DiscussionChat;
