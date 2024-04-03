import React from "react";
import { PiNotePencilBold } from "react-icons/pi";

const UserRegister = () => {
  return (
    <>
      <div className="bg-blue-500   ">
        <div className="flex justify-center container mx-auto my-auto w-screen h-screen items-center flex-col">
          <div className="text-slate-100 items-center">
            <PiNotePencilBold size={54} />
            <div className="text-center pb-3">Register</div>
          </div>

          <div className="w-full md:w-3/4  lg:w-1/2 flex flex-col items-center bg-slate-50 rounded-md pt-12">
            <div className="w-3/4 mb-6">
              <input
                type="text"
                name="username"
                id="username"
                className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
                placeholder="username "
              />
            </div>

            <div className="w-3/4 mb-6">
              <input
                type="text"
                name="fullname"
                id="fullname"
                className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500  border-solid border-2 border-slate-300"
                placeholder="full name"
              />
            </div>

            <div className="w-3/4 mb-6">
              <input
                type="email"
                name="email"
                id="email"
                className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500  border-solid border-2 border-slate-300"
                placeholder="email address"
              />
            </div>
            <div className="w-3/4 mb-6">
              <input
                type="password"
                name="password"
                id="password"
                className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500  border-solid border-2 border-slate-300"
                placeholder="Password"
              />
            </div>

            <div className="w-3/4 mb-12">
              <button
                type="submit"
                className="py-4 bg-blue-500 w-full rounded text-blue-50 font-bold hover:bg-blue-700"
              >
                REGISTER
              </button>
            </div>
          </div>
          <div className="flex justify-center container mx-auto mt-6 text-slate-100 text-sm">
            <div className="flex flex-col sm:flex-row  justify-end md:w-1/2 items-center">
              <a className="flex " href="/login">
                have an account? Login Here
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
