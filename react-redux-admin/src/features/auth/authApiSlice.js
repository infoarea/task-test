import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Create User
export const createUser = createAsyncThunk("auth/createUser", async (data) => {
  try {
    const response = await axios.post(
      "https://task-api-mopy.onrender.com/api/v1/auth/register",
      data,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//Login User
export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  try {
    const response = await axios.post(
      "https://task-api-mopy.onrender.com/api/v1/auth/login",
      data,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//Login User
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await axios.post(
      "https://task-api-mopy.onrender.com/api/v1/auth/logout",
      "",
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
});

//Get Loggedin User
export const getLoggedInUser = createAsyncThunk(
  "auth/getLoggedInUser",
  async () => {
    try {
      const response = await axios.get(
        "https://task-api-mopy.onrender.com/api/v1/auth/me",
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
