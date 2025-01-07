import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home/Home";
import Contact from "../pages/Contact/Contact";
import Doctor from "../pages/Doctor/Doctor/Doctor";
import DoctorDetails from "../pages/Doctor/DoctorDetails/DoctorDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import Appoinments from "../pages/Dashboard/Appoinments/Appoinments";
import AddDoctor from "../pages/Dashboard/AddDoctor/AddDoctor";
import ManageDoctor from "../pages/Dashboard/ManageUsers/ManageUsers";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Dashboard/Profile/Profile";

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
        path: "doctor/:id",
        element: <DoctorDetails />,
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Appoinments />,
      },
      {
        path: "appoinment",
        element: <Appoinments />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "addDoctor",
        element: <AddDoctor />,
      },
      {
        path: "manageDoctor",
        element: <ManageDoctor />,
      },
    ],
  },
]);

export default Router;
