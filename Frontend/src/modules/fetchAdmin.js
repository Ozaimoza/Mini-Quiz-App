import { instance } from "./axios";

import axios from "axios";

const loginAdmin = async (credentials) => {
  // const setAuthToken = useAuth();
  try {
    const response = await axios.post(
      "http://localhost:3000/admin/login",
      credentials
    );

    const result = response.data;
    // console.log(token);
    return result;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const logoutAdmin = async () => {
  try {
    const response = await axios.post("http://localhost:3000/admin/logout");
    // console.log(response);
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const getAllUser = async () => {
  try {
    const response = await instance.get("/admin/user");
    const result = response.data;
    // console.log(token);
    return result;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const createQuestion = async (data) => {
  try {
    const response = await instance.post("/admin/question", data);
    const result = response.data;
    return result;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const createAnswer = async (data) => {
  try {
    const response = await instance.post("/admin/answer", data);
    const result = response.data;
    return result;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const getAllQuestion = async () => {
  try {
    const response = await instance.get("/admin/question");
    const result = response.data;
    return result;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const getQuestionById = async (id) => {
  try {
    const response = await instance.get(`/admin/${id}`);
    const result = response.data;
    return result;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const updateQuestionById = async (id, data) => {
  try {
    const response = await instance.put(`/admin/question/${id}`, data);
    const result = response.data;
    return result;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const updateMultiChoice = async (data) => {
  try {
    const response = await instance.put(`/admin/answer`, data);
    const result = response.data;
    return result;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const deleteQuestion = async (id) => {
  try {
    const response = await instance.delete(`/admin/question/${id}`);
    const result = response.data;
    return result;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

export {
  loginAdmin,
  logoutAdmin,
  getAllUser,
  createQuestion,
  createAnswer,
  getAllQuestion,
  getQuestionById,
  updateMultiChoice,
  updateQuestionById,
  deleteQuestion,
};
