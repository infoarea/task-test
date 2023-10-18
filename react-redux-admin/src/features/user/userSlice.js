import { createSlice } from "@reduxjs/toolkit";
import {
  UpdateUserStatus,
  createPermission,
  createRole,
  deletePermission,
  deleteRole,
  deleteUser,
  getAllPermission,
  getAllRoles,
  getAllUsers,
  updatePermissionStatus,
  updateRole,
  updateRoleStatus,
  updateUser,
  updateUserPassword,
  updateUserProfilePicture,
  userCreate,
} from "./userApiSlice";

//create auth slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    permission: null,
    role: null,
    user: null,
    error: null,
    message: null,
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
      .addCase(getAllPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllPermission.fulfilled, (state, action) => {
        state.permission = action.payload;
      })
      .addCase(createPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.permission = state.permission ?? [];
        state.permission.push(action.payload.permission);
        state.message = action.payload.message;
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.permission = state.permission.filter(
          (data) => data._id !== action.payload
        );
      })
      .addCase(updatePermissionStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatePermissionStatus.fulfilled, (state, action) => {
        state.permission[
          state.permission.findIndex(
            (data) => data._id === action.payload.permission._id
          )
        ] = action.payload.permission;
        state.message = action.payload.message;
      })
      .addCase(getAllRoles.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.role = action.payload;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.role = state.role ?? [];
        state.role.push(action.payload.role);
        state.message = action.payload.message;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.role[
          state.role.findIndex((data) => data._id === action.payload.role._id)
        ] = action.payload.role;
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.role = state.role.filter((data) => data._id !== action.payload);
      })
      .addCase(updateRoleStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateRoleStatus.fulfilled, (state, action) => {
        state.role[
          state.role.findIndex((data) => data._id === action.payload.role._id)
        ] = action.payload.role;
        state.message = action.payload.message;
      })
      .addCase(userCreate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(userCreate.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = state.user ?? [];
        state.user.push(action.payload.user);
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = state.user.filter((data) => data._id !== action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user[
          state.user.findIndex((data) => data._id === action.payload.user._id)
        ] = action.payload.user;
      })
      .addCase(UpdateUserStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(UpdateUserStatus.fulfilled, (state, action) => {
        state.user[
          state.user.findIndex((data) => data._id === action.payload.user._id)
        ] = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(updateUserPassword.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user[
          state.user.findIndex((data) => data._id === action.payload.user._id)
        ] = action.payload.user;
        state.loader = false;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(updateUserProfilePicture.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateUserProfilePicture.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user[
          state.user.findIndex((data) => data._id === action.payload.user._id)
        ] = action.payload.user;
        state.loader = false;
      })
      .addCase(updateUserProfilePicture.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      });
  },
});

//selector data
export const getUserData = (state) => state.user;
//export actions
export const { setMessageEmpty } = userSlice.actions;
//export reducer
export default userSlice.reducer;
