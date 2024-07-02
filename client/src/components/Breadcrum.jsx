import React from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Bread = ({ className }) => {
  const location = useLocation();
  const routeslocation = location.pathname.split("/").filter((i) => i);

  const shortenText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const breadcrumbItems = [
    {
      title: <HomeIcon />,
      path: "/",
    },
    ...routeslocation.map((route, index) => ({
      title:
        index === routeslocation.length - 1 ? shortenText(route, 20) : route,
      path: `/${routeslocation.slice(0, index + 1).join("/")}`,
    })),
  ];

  return (
    <Breadcrumbs
      className={className}
      style={{ margin: "0 0 0 20px" }}
      aria-label="breadcrumb"
    >
      {breadcrumbItems.map((item, index) => (
        <Link
          key={index}
          color={
            index === breadcrumbItems.length - 1 ? "text.primary" : "inherit"
          }
          href={item.path}
          style={{ display: "flex", alignItems: "center" }}
        >
          {index === 0 ? item.title : item.title}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default Bread;
