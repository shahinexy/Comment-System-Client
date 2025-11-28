import Login from "@/pages/Authentication/Login";
import Register from "@/pages/Authentication/Register";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import Home from "@/pages/Home/Home";
import Post from "@/pages/Post/Post";
import Root from "@/Root/Root";
import { createBrowserRouter } from "react-router-dom";
import PrivetRoute from "./PrivetRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: (
          <PrivetRoute>
            {" "}
            <Post />
          </PrivetRoute>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
