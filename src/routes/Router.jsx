import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home/Home";
import Contact from "../pages/Contact/Contact";
import Doctor from "../pages/Doctor/Doctor/Doctor";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "doctor",
        element: <Doctor />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default Router;
