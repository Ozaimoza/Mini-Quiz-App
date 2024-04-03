import { instance } from "./axios";

import axios from "axios";

const registerUser = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/register", data);
    const result = response.data;

    return result;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const loginUser = async (credentials) => {
  // const setAuthToken = useAuth();
  try {
    const response = await axios.post(
      "http://localhost:3000/login",
      credentials
    );

    const result = response.data;
    // console.log(token);
    return result;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const logoutUser = async () => {
  try {
    await axios.post("http://localhost:3000/logout");
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const getAllQuestion = async () => {
  try {
    const response = await instance.get("/question");
    const result = response.data;
    return result;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const submitAnswers = async (data) => {
  try {
    const response = await instance.post("/question", data);
    const result = response.data;
    return result;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const getUserById = async (userId) => {
  try {
    const response = await instance.get(`/user/${userId}`);
    const result = response.data;
    return result;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

export {
  loginUser,
  registerUser,
  logoutUser,
  getAllQuestion,
  submitAnswers,
  getUserById,
};
