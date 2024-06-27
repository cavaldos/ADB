import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import AdminRouter from "../../routes/Admin";
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
        <div className="bg-slate-200">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500">Dashboard / Tables</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 bg-slate-300">
        <input
          type="text"
          placeholder="Type to search..."
          className="p-2 border border-gray-300 rounded-md"
        />
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <span>Thomas Anree</span>
        </div>
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
