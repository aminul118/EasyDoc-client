import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 ">
      {/* Sidebar */}
      <nav className="2xl:w-96 w-64 bg-white shadow-md lg:px-8">
        <div className="p-4 text-xl font-bold text-center border-b">
          Dashboard
        </div>
        <ul className="flex flex-col mt-4 gap-4 ">
          <li>
            <NavLink to="/dashboard/appoinment" className="btn">
              My Appointments
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile" className="px-4">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/settings" className="px-4">
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/logout" className="px-4">
              Logout
            </NavLink>
          </li>
          <div className="divider"></div>

          <li>
            <NavLink to="/" className="px-4">
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
