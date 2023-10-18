import PageLayout from "../components/PageLayout/PageLayout";
import Brand from "../pages/brand/Brand";
import Category from "../pages/category/Category";
import Dashboard from "../pages/dashboard/Dashboard";
import Permission from "../pages/permission/Permission";
import Profile from "../pages/profile/Profile";
import Role from "../pages/role/Role";
import Tag from "../pages/tag/Tag";
import SingleTask from "../pages/tasks/SingleTask";
import Tasks from "../pages/tasks/Tasks";
import User from "../pages/user/User";
import PrivateGard from "./PrivateGard";

const privateRouter = [
  {
    element: <PrivateGard />,
    children: [
      {
        element: <PageLayout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/users",
            element: <User />,
          },
          {
            path: "/permission",
            element: <Permission />,
          },
          {
            path: "/role",
            element: <Role />,
          },
          {
            path: "/brand",
            element: <Brand />,
          },
          {
            path: "/tag",
            element: <Tag />,
          },
          {
            path: "/category",
            element: <Category />,
          },

          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/tasks",
            element: <Tasks />,
          },
          {
            path: "/tasks/:id",
            element: <SingleTask />,
          },
        ],
      },
    ],
  },
];

export default privateRouter;
