import React from "react";
import { MdOutlineExitToApp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logoutUser } from "../modules/fetchUser";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutUser();
    Cookies.remove("token");
    Cookies.remove("currentUser");

    navigate("/login");
  };
  return (
    <>
      <div className="flex flex-wrap ">
        <nav className="flex justify-between bg-blue-500 text-white w-screen">
          <div className="px-5 xl:px-12 py-6 flex w-full justify-between">
            <a className="text-3xl font-bold font-heading" href="#">
              {/* <img className="h-9" src="logo.png" alt="logo"/> */}
              QUIZ
            </a>

            <div className="flex items-center space-x-5">
              <button
                className="group flex items-center justify-start w-11 h-11 bg-blue-500 rounded-full cursor-pointer relative overflow-hidden 
                  transition-all duration-200  hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
                onClick={handleLogout}
              >
                <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                  <MdOutlineExitToApp size={26} />
                </div>
                <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  Logout
                </div>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
