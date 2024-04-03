import React, { useEffect, useState } from "react";
import { getUserById } from "../../modules/fetchUser";
import Cookies from "js-cookie";

const Score = () => {
  const [score, setScore] = useState(0);

  const userId = Cookies.get("currentUser");
  const fetchUser = async () => {
    try {
      const response = await getUserById(userId);
      setScore(response.data.score);
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  useEffect(() => {
    fetchUser();
    // console.log(userId);
  }, []);

  return (
    <>
      <div className="flex justify-center h-[85vh]">
        <div className=" flex flex-col justify-center ">
          <a className=" text-9xl text-center">Your Score </a>
          <a
            className={`text-8xl text-center font-bold ${
              score >= 70 ? " text-green-600" : "text-red-600"
            }`}
          >
            {score}
          </a>
        </div>
      </div>
    </>
  );
};

export default Score;
