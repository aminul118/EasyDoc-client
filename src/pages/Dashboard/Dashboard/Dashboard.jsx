import { NavLink } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { FaUserDoctor, FaBook, FaGear } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";

import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";

const Dashboard = () => {
  const { logOut } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  console.log(isAdmin, isAdminLoading);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="2xl:w-96 w-64 bg-white shadow-md lg:px-8">
        <div className="p-4 text-xl font-bold text-center border-b">
          Dashboard
        </div>
        <ul className="flex flex-col mt-4 gap-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/addDoctor"
                  className="px-4 w-full btn justify-start"
                >
                  <FaUserDoctor /> Add Doctor
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/manageDoctor"
                  className="px-4 w-full btn justify-start"
                >
                  <FaGear /> Manage Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/dashboard/appoinment"
                  className="px-4 w-full btn justify-start"
                >
                  <FaBook /> My Appointments
                </NavLink>
              </li>
            </>
          )}
          <li className="divider"></li>
          {/* Shared */}
          <li>
            <NavLink
              to="/dashboard/profile"
              className="px-4 btn w-full justify-start"
            >
              <FaUser /> Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/doctor" className="px-4 btn w-full justify-start">
              <FaUserDoctor /> Doctor
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="px-4 btn w-full justify-start">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <button onClick={logOut} className="px-4 w-full btn justify-start">
              <TbLogout /> Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
