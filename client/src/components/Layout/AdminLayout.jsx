import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import AdminRouter from "../../routes/Admin";
import { AdminAccount } from "../AccountCpn";
import Bread from "../Breadcrum";
const NavbarItem = ({ name, togglemenu, icon, path }) => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };
  return (
    <button
      onClick={() => handleClick(path)}
      className="p-2 rounded hover:bg-gray-200 w-full text-left flex gap-2 transition-all"
    >
      {icon}
      {togglemenu ? (
        <h3 className="truncate overflow-hidden whitespace-nowrap text-ellipsis">
          {name}
        </h3>
      ) : (
        <h3></h3>
      )}
    </button>
  );
};

const Sidebar = ({ togglemenu }) => {
  return (
    <div
      className={`fixed top-0 left-0 bottom-0 transition-all duration-300 bg-white border-r mt-headerh ${
        togglemenu ? "w-64" : "w-20"
      }`}
    >
      <nav className="p-5 overflow-y-auto h-full">
        {AdminRouter.map((item, index) => {
          return (
            <NavbarItem
              name={item.name}
              togglemenu={togglemenu}
              key={index}
              path={item.path}
              icon={item.icon}
            />
          );
        })}
      </nav>
    </div>
  );
};

const Header = ({ togglemenu, toggleSidebar }) => {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white shadow z-50 h-headerh ">
      <div className="flex items-center">
        <button className="text-gray-700 mr-4" onClick={toggleSidebar}>
          {togglemenu ? (
            <MenuIcon className="text-2xl" />
          ) : (
            <MenuOpenIcon className="text-2xl" />
          )}
        </button>
        <div className="flex">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Bread className={"pt-1"} />
        </div>
      </div>
      <div className="flex items-center space-x-4 mr-4">
        <AdminAccount />
      </div>
    </div>
  );
};
const AdminLayout = ({ children }) => {
  const [togglemenu, setTogglemenu] = useState(true);
  const toggleSidebar = () => {
    setTogglemenu(!togglemenu);
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Header togglemenu={togglemenu} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex">
        <Sidebar togglemenu={togglemenu} />
        <main
          className={`flex-1 p-6 mt-headerh transition-all ${
            togglemenu ? "ml-64" : "ml-20"
          } `}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
