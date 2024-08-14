import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
const ChatIcon = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/chat")}
      className=" bottom-4 right-4 text-black p-2 rounded-full z-50"
    >
      <Badge
        badgeContent={1}
        invisible={false}
        color="error"
        sx={{ color: "black" }}
      >
        <IoChatbubbleEllipsesOutline size={24} />
      </Badge>
    </button>
  );
};

export default ChatIcon;
