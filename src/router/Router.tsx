import ErrorPage from "@/pages/Home/ErrorPage/ErrorPage";
import Home from "@/pages/Home/Home";
import Root from "@/Root/Root";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
]);

export default router;
