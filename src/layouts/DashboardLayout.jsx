import { Outlet } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";

const DashboardLayout = () => {
  return (
    <div className="flex gap-6 items-center">
      <Dashboard />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
