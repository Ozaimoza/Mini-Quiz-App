import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import UserLogin from "../pages/user/UserLogin";
import UserRegister from "../pages/user/UserRegister";
import Home from "../pages/user/UserHome";
import Score from "../pages/user/Score";
import Navbar from "../components/navbar";

import { getUserById } from "../modules/fetchUser";

const HomeOrScore = () => {
  const [hasScore, setHasScore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userId = Cookies.get("currentUser");
      try {
        const response = await getUserById(userId);
        const userScore = response.data.score;
        setHasScore(userScore !== undefined && userScore !== null);
      } catch (error) {
        console.error("Error fetching user score:", error);
      }
    };

    fetchData();
  }, []);

  return hasScore ? <Score /> : <Home />;
};

const checkAuthentication = () => {
  return Cookies.get("token") !== undefined;
};

const PrivateRoute = ({ element }) => {
  return checkAuthentication() ? element : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

const UserRouter = () => {
  return (
    <Routes>
      {/* Rute untuk redirect ke /admin/home jika pengguna sudah terautentikasi */}
      <Route
        path="/"
        element={<Navigate to={checkAuthentication() ? "/home" : "/login"} />}
      />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />

      {/* Rute untuk halaman admin */}
      <Route
        path="/*"
        element={
          checkAuthentication() ? (
            <div className="flex flex-col">
              <Navbar />
              <Routes>
                <Route path="/home" element={<HomeOrScore />} />
              </Routes>
            </div>
          ) : (
            // Redirect ke halaman login jika tidak terautentikasi
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default UserRouter;
