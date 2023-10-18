import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoggedInUser } from "./features/auth/authApiSlice";
import {
  getAllPermission,
  getAllRoles,
  getAllUsers,
} from "./features/user/userApiSlice";
import {
  getAllBrand,
  getAllCategory,
  getAllProductTag,
  getAllTask,
} from "./features/product/productApiSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(getLoggedInUser());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllPermission());
    dispatch(getAllRoles());
    dispatch(getAllUsers());
    dispatch(getAllBrand());
    dispatch(getAllProductTag());
    dispatch(getAllCategory());
    dispatch(getAllTask());
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
      ;
      <RouterProvider router={router} />
    </>
  );
}

export default App;
