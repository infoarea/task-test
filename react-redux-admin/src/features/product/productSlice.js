import { createSlice } from "@reduxjs/toolkit";
import {
  createBrand,
  createCategory,
  createProductTag,
  createTask,
  deleteBrand,
  deleteCategory,
  deleteProductTag,
  deleteTask,
  getAllBrand,
  getAllCategory,
  getAllProductTag,
  getAllTask,
  updateBrand,
  updateBrandStatus,
  updateCategory,
  updateTagStatus,
  updateTask,
  updateTaskStatus,
} from "./productApiSlice";

//create product slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    task: null,
    category: null,
    brand: null,
    tag: null,
    message: null,
    error: null,
    loader: false,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBrand.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.brand = state.brand ?? [];
        state.brand.push(action.payload.brand);
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllBrand.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getAllBrand.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllBrand.fulfilled, (state, action) => {
        state.brand = action.payload.brand;
        state.loader = false;
      })
      .addCase(deleteBrand.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.brand = state.brand.filter(
          (data) => data._id !== action.payload.brand._id
        );
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(updateBrand.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.brand[
          state.brand.findIndex((data) => data._id === action.payload.brand._id)
        ] = action.payload.brand;
        state.loader = false;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(updateBrandStatus.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.brand[
          state.brand.findIndex((data) => data._id === action.payload.brand._id)
        ] = action.payload.brand;
        state.loader = false;
      })
      .addCase(createProductTag.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createProductTag.fulfilled, (state, action) => {
        state.tag = state.tag ?? [];
        state.tag.push(action.payload.tag);
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(createProductTag.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllProductTag.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getAllProductTag.fulfilled, (state, action) => {
        state.tag = action.payload.tag;
        state.loader = false;
      })
      .addCase(getAllProductTag.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(deleteProductTag.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteProductTag.fulfilled, (state, action) => {
        state.loader = false;
        state.tag = state.tag.filter(
          (data) => data._id !== action.payload.tag._id
        );
        state.message = action.payload.message;
      })
      .addCase(updateTagStatus.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.tag[
          state.tag.findIndex((data) => data._id === action.payload.tag._id)
        ] = action.payload.tag;
        state.loader = false;
      })
      .addCase(getAllCategory.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loader = false;
        state.category = action.payload.category;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.error.message;
      })
      .addCase(createCategory.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loader = false;
        state.category = state.category ?? [];
        state.category.push(action.payload.category);
        state.message = action.payload.message;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.category = state.category.filter(
          (data) => data._id !== action.payload.category._id
        );
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loader = false;
        state.message = action.error.message;
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.category[
          state.category.findIndex(
            (data) => data._id === action.payload.category._id
          )
        ] = action.payload.category;
        state.loader = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(getAllTask.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getAllTask.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllTask.fulfilled, (state, action) => {
        state.task = action.payload.task;
        state.loader = false;
      })
      .addCase(createTask.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.task = state.task ?? [];
        state.task.push(action.payload.task);
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.task = state.task.filter(
          (data) => data._id !== action.payload.task._id
        );
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(updateTask.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.task[
          state.task.findIndex((data) => data._id === action.payload.task._id)
        ] = action.payload.task;
        state.loader = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.task[
          state.task.findIndex((data) => data._id === action.payload.task._id)
        ] = action.payload.task;
        state.loader = false;
      });
  },
});

//export actions
export const { setMessageEmpty } = productSlice.actions;
//export reducer
export default productSlice.reducer;
