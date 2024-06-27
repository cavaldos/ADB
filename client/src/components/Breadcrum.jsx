import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

const Bread = ({className}) => {
  const location = useLocation();
  const routeslocation = location.pathname.split("/").filter((i) => i);

  const shortenText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "";
  };

  const breadcrumbItems = [
    {
      title: <HomeOutlined />,
    },
    ...routeslocation.map((route, index) => ({
      title:
        index === routeslocation.length - 0 ? shortenText(route, 0) : route,
    })),
  ];
  return (
    <>
      <Breadcrumb className={`${className}`} style={{ margin: " 0 0 0 20px" }} items={breadcrumbItems} />
    </>
  );
};

export default Bread;
