import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Tag } from "antd";

const InfoDetailItem = ({ title, value, color, openTag }) => {
  return (
    <div className="mb-2">
      <span className="font-bold text-gray-800">{title}: </span>
      {openTag ? (
        <Tag color={color} className="ml-2">
          {value}
        </Tag>
      ) : (
        <span className="ml-2">{value}</span>
      )}
    </div>
  );
};

const Information = ({ user }) => {
  const profile = useSelector((state) => state.profile);

  return (
    <>
      <div className=" flex gap-10 min-h-[300px]">
        <div className="card bg-base-100  shadow-xl shadow-gray-200 rounded-xl w-1/2 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Profile Information
          </h2>

          <InfoDetailItem title="Full Name" value={profile.FullName} />
          <InfoDetailItem title="Phone Number" value={profile.Phone} />
          <InfoDetailItem title="Email" value={profile.Email} />
          <InfoDetailItem title="Address" value={profile.Address} />
          {profile.Status ? (
            <InfoDetailItem
              title="Status"
              value={profile.Status}
              openTag={true}
              color={"red"}
            />
          ) : (
            <></>
          )}
          {profile.Level ? (
            <InfoDetailItem
              title="Level"
              value={profile.Level}
              openTag={true}
              color={"blue"}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="card bg-base-100  shadow-xl shadow-gray-200 rounded-md p-2 w-1/2">
          
        </div>
      </div>
    </>
  );
};

export default Information;
