import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Get All brand
export const getAllBrand = createAsyncThunk("product/getAllBrand", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/brand", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//Create brand
export const createBrand = createAsyncThunk(
  "product/createBrand",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/brand",
        data,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Delete brand
export const deleteBrand = createAsyncThunk(
  "product/deleteBrand",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/brand/${id}`,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Update brand
export const updateBrand = createAsyncThunk(
  "product/updateBrand",
  async ({ id, data }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/brand/${id}`,
        data,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Update brand
export const updateBrandStatus = createAsyncThunk(
  "product/updateBrandStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/brand/brand-status/${id}`,
        { status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Create Product Tag
export const createProductTag = createAsyncThunk(
  "user/createProductTag",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/tag",
        data,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Get All Product Tag
export const getAllProductTag = createAsyncThunk(
  "user/getAllProductTag",
  async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/v1/tag", {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Delete Product Tag
export const deleteProductTag = createAsyncThunk(
  "user/deletProductTag",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/tag/${id}`,
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

//Delete Product Tag
export const updateProductTag = createAsyncThunk(
  "user/updateProductTag",
  async ({ id, data }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/tag/${id}`,
        data,
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

//Update Tag Status
export const updateTagStatus = createAsyncThunk(
  "product/updateTagStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/tag/tag-status/${id}`,
        { status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Get All Category
export const getAllCategory = createAsyncThunk(
  "product/getAllCategory",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/v1/category",
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

//Create Category
export const createCategory = createAsyncThunk(
  "product/createCategory",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/category",
        data,
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

//Category Delete
export const deleteCategory = createAsyncThunk(
  "product/deleteCategory",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/category/${id}`,
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

//Update Category
export const updateCategory = createAsyncThunk(
  "product/updateCategory",
  async ({ id, data }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/category/${id}`,
        data,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Get All brand
export const getAllTask = createAsyncThunk("product/getAllTask", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/task", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//Create Task
export const createTask = createAsyncThunk(
  "product/createTask",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/task",
        data,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Delete Task
export const deleteTask = createAsyncThunk("product/deleteTask", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/task/${id}`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//Update brand
export const updateTask = createAsyncThunk(
  "product/updateTask",
  async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/task/${data.id}`,
        data,
        { withCredentials: true }
      );

      console.log(response);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Update brand
export const updateTaskStatus = createAsyncThunk(
  "product/updateTaskStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/task/task-status/${id}`,
        { status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
