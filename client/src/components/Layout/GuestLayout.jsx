import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../other/Footer";
import { GuestRouter } from "../../routes";
import SearchCourse from "../Course/SearchCourse";

const GuestLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [locationPath, setLocationPath] = useState(location.pathname);
  useEffect(() => {
    setLocationPath(location.pathname);
  }, [location.pathname]);

  const shouldHideFooter =
    locationPath === "/signin" || locationPath === "/signup";

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1
              onClick={() => navigate("/")}
              className="text-4xl font-semibold text-[#0156d1] cursor-pointer "
            >
              coursera
            </h1>
          </div>
          {!shouldHideFooter && <SearchCourse />}
          <div className="flex items-center space-x-4  ">
            <button
              onClick={() => navigate("/signin")}
              className="text-gray-700 hover:text-sky-600 font-semibold"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="hover:text-sky-700 border hover:border-sky-700 rounded-full px-4 py-2 font-semibold"
            >
              Join for Free
            </button>
          </div>
        </nav>
      </header>
      <main className="flex-grow min-h-[90vh]">{children}</main>
      <Footer />
    </div>
  );
};

export default GuestLayout;
