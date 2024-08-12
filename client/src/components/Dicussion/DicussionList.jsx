import React from "react";
import { useNavigate } from "react-router-dom";
const DiscussionItem = ({ discussion }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/discussion/22`)}
      className="btn w-full rounded-md"
    >
      dddd
    </button>
  );
};
function DicussionList() {
  return (
    <div className="w-1/5 bg-orange-400 p-1 bg-blue-gray-100 rounded-md">
      <h2 className="text-center mb-2 text-lg font-bold ">Discussion List</h2>
      <div className="flex flex-col gap-2">
        <DiscussionItem id="1" />
        <DiscussionItem id="1" />
        <DiscussionItem id="1" />
      </div>
    </div>
  );
}

export default DicussionList;
