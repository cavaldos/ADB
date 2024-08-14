import React from "react";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { TabMenuPro, TabMenuProContentProfile } from "../other/TabMenuPro";
function ProfileLayout({ children }) {
  const navigate = useNavigate();
  return (
    <>
      <div className=" w-[90vw] min-h-[80vh] mx-auto pt-2 bg-[#F8F9FA] ">
        <div className="w-full rounded-2xl mt-4 h-[290px] relative bg-center bg-cover items-center overflow-hidden shadow-md">
          <IoMdExit
            onClick={() => navigate(-1)}
            className=" relative z-10 mt-5 ml-5 text-3xl text-white transform -scale-x-100 hover:cursor-pointer"
          />

          <img
            className="w-full h-full absolute top-0 left-0 rounded-2xl blur-sm opacity-90 z-0"
            alt=""
            src="/images/bgprofile.png"
          />
        </div>
        <div
          style={{ backgroundColor: "rgba(244,228,249, 0.7)" }}
          class="relative flex  flex-auto min-w-0 w-[95%]  mx-auto bottom-14
          h-[130px] overflow-hidden break-words  shadow-blur rounded-2xl
          bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200 shadow-xl"
        >
          <div className="flex  w-2/5 p-2">
            <h1>fasdf</h1>
          </div>
          <div className="w-3/5 p-2 flex justify-end items-center pr-[50px] ">
            <TabMenuPro className=" w-[600px]" />
          </div>
        </div>
        <div className=" bg- [#f1f1f1] relative top-[-20px] rounded-xl">
          <TabMenuProContentProfile />
        </div>
      </div>
    </>
  );
}
export default ProfileLayout;
