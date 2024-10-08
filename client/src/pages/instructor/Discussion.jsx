import React from "react";
import DicussionList from "../../components/Dicussion/DicussionList";
import DiscussionChat from "../../components/Dicussion/DiscussionChat";
function Discussion() {
  return (
    <div className="flex h-[90vh] bg-[#F1F1F1] rounded-md  gap-2">
      <DicussionList />
      <DiscussionChat />
    </div>
  );
}

export default Discussion;
