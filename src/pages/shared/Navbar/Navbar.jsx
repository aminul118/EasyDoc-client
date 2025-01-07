import { Link, NavLink } from "react-router-dom";
import logo from "/logo.png";
import useAuth from "../../../hooks/useAuth";
import { CiBookmarkCheck } from "react-icons/ci";
import useBookedSlots from "../../../hooks/useBookedSlots";
import img from "../../../assets/icons/emptyUser.png";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [appointments] = useBookedSlots();

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/doctor">Doctor</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      <li>
        <Link to="/dashboard/appoinment">
          <div className="indicator">
            <CiBookmarkCheck className="text-xl mt-1" />
            <span className="badge badge-sm indicator-item">
              +{appointments?.length || 0}
            </span>
          </div>
        </Link>
      </li>
    </>
  );

  const adminLinks = (
    <>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <button onClick={logOut}>Logout</button>
      </li>
    </>
  );

  const userProfile = (
    <div className="flex-none gap-2">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            {user?.photoURL && user.photoURL !== "null" ? (
              <img alt="User Avatar" src={user.photoURL} />
            ) : (
              <img alt="Default Avatar" src={img} />
            )}
          </div>
        </div>

        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[50] mt-3 w-52 p-2 shadow"
        >
          {adminLinks}
        </ul>
      </div>
    </div>
  );

  return (
    <header className="fixed w-full bg-white z-50 shadow-md">
      <div className="navbar w-11/12 mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[50] mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/">
            <div className="flex items-center gap-2">
              <img className="w-12" src={logo} alt="Logo" />
              <p className="text-2xl font-bold text-blue-500">
                <span className="text-red-600">Easy</span>Doc
              </p>
            </div>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {loading ? (
            <span className="loading loading-ring loading-lg"></span>
          ) : user?.email ? (
            userProfile
          ) : (
            <Link
              to="/login"
              className="btn bg-blue-600 text-white hover:bg-red-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
