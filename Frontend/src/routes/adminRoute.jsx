import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

import SideBar from "../components/Sidebar";

import UserList from "../pages/admin/Userlist";
import AdminLogin from "../pages/admin/AdminLogin";
import QuestionList from "../pages/admin/QuestionsList";

const checkAuthentication = () => {
  return Cookies.get("token") !== undefined;
};

const PrivateRoute = ({ element }) => {
  return checkAuthentication() ? element : <Navigate to="/admin/login" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

const AdminRouter = () => {
  return (
    <Routes>
      {/* Rute untuk redirect ke /admin/home jika pengguna sudah terautentikasi */}
      <Route
        path="/"
        element={
          <Navigate
            to={checkAuthentication() ? "/admin/users" : "/admin/login"}
          />
        }
      />
      <Route path="/login" element={<AdminLogin />} />

      {/* Rute untuk halaman admin */}
      <Route
        path="/*"
        element={
          checkAuthentication() ? (
            <div className="flex flex-row w-[100vw]">
              <SideBar />
              <Routes>
                <Route path="/users" element={<UserList />} />
                <Route path="/questions" element={<QuestionList />} />
              </Routes>
            </div>
          ) : (
            // Redirect ke halaman login jika tidak terautentikasi
            <Navigate to="/admin/login" />
          )
        }
      />
    </Routes>
  );
};

export default AdminRouter;
