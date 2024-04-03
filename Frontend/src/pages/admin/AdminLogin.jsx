import React, { useState } from "react";
import { loginAdmin } from "../../modules/fetchAdmin";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import loginImage from "../../assets/login.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await loginAdmin(credentials);

      const { token, currentUser, userId } = response;
      Cookies.set("token", token, { expires: 1 });
      Cookies.set("currentUser", currentUser, { expires: 1 });
      Cookies.set("userId", userId, { expires: 1 });

      navigate("/admin/users");
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    handleLogin();
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-[80vw]">
        <div className="md:flex w-full max-h-[80vh]">
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
            <img src={loginImage} alt="Login" />
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">LOGIN</h1>
              <p>Enter your information to Login</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="username"
                  className="text-xs font-semibold px-1"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-12">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold px-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-5">
                <button
                  type="submit"
                  className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
