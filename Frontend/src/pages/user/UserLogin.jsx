import React, { useState } from "react";
import { BiLogIn } from "react-icons/bi";

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { loginUser } from "../../modules/fetchUser";

const UserLogin = () => {
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
      const response = await loginUser(credentials);
      // console.log(response);

      const { token, currentUser, userId } = response;
      Cookies.set("token", token, { expires: 1 });
      Cookies.set("currentUser", currentUser, { expires: 1 });
      // Cookies.set("userId", userId, { expires: 1 });

      navigate("/home");
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <>
      <div className="bg-blue-500   ">
        <div className="flex justify-center container mx-auto my-auto w-screen h-screen items-center flex-col">
          <div className="text-slate-100 items-center">
            <BiLogIn size={54} />
            <div className="text-center pb-3">Welcome </div>
          </div>

          <div className="w-full md:w-3/4  lg:w-1/2 flex flex-col items-center bg-slate-50 rounded-md pt-12">
            <div className="w-3/4 mb-6">
              <input
                type="text"
                name="username"
                id="username"
                className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
                placeholder="username "
                value={credentials.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="w-3/4 mb-6">
              <input
                type="password"
                name="password"
                id="password"
                className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500  border-solid border-2 border-slate-300"
                placeholder="Password"
                value={credentials.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="w-3/4 mb-12">
              <button
                type="submit"
                className="py-4 bg-blue-500 w-full rounded text-blue-50 font-bold hover:bg-blue-700"
                onClick={handleLogin}
              >
                {" "}
                LOGIN
              </button>
            </div>
          </div>
          <div className="flex justify-center container mx-auto mt-6 text-slate-100 text-sm">
            <div className="flex flex-col sm:flex-row  justify-end md:w-1/2 items-center">
              <a className="flex " href="/register">
                Don't have an account? Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
