import React from "react";
import Login from "./components/Login";
import HomPage from "./components/Hompage";
import Register from "./components/Register";
import ProfilePage from "./components/ProfilePage";
import FriendsDetail from "./components/FriendsDetail";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/homepage",
    element: <HomPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/login/Register",
    element: <Register />,
  },
  {
    path: "/profile-page/:name/:userId",
    element: <ProfilePage />,
  },
  {
    path: "/user/:userId",
    element: <FriendsDetail />,
  },

  {
    path: "/*",
    element: <Navigate to="/login" />,
  },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
