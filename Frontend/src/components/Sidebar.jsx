import React from "react";
import { TbLogout } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineQuiz } from "react-icons/md";
import { logoutAdmin } from "../modules/fetchAdmin";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SideBar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutAdmin();
    Cookies.remove("token");

    navigate("/admin/login");
  };
  return (
    <>
      <div className=" bg-gray-500 ">
        <nav className="z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 fixed top-2/4 -translate-y-2/4 left-6 min-h-[auto] min-w-[64px] flex-col rounded-lg border">
          <a
            href="/admin/users"
            className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 bg-indigo-50 text-indigo-600 dark:bg-sky-900 dark:text-sky-50"
          >
            <FaRegUser size={28} />

            <small className="text-center text-xs font-medium"> User </small>
          </a>

          <a
            href="/admin/questions"
            className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
          >
            <MdOutlineQuiz size={28} />

            <small className="text-center text-xs font-medium">Questions</small>
          </a>

          <hr className="dark:border-gray-700/60" />

          <a
            onClick={handleLogout}
            className="flex h-16 w-16 flex-col items-center justify-center gap-1 text-fuchsia-900 dark:text-gray-400"
          >
            <TbLogout size={28} />

            <small className="text-xs font-medium">logout</small>
          </a>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
