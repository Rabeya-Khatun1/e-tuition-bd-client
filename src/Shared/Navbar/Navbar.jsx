import React, { useState } from "react";
import Logo from "../../Components/Logo/Logo";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import {
  FaQuestionCircle,
  FaRegMoon,
  FaSignOutAlt,
  FaSun,
  FaUserCircle,
  FaHome,
  FaBook,
  FaChalkboardTeacher,
  FaInfoCircle,
  FaEnvelope,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleThemeToggle = (e) => {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "mygreen"); 
    }
  };

  const handleSignOut = () => {
    signOutUser().then(() => {
      Swal.fire({
        title: "Logged Out!",
        text: "You have been logged out successfully!",
        icon: "success",
      });
      navigate("/login");
    });
  };

  const links = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/tuitions", label: "Tuitions", icon: <FaBook /> },
    { to: "/tutors", label: "Tutors", icon: <FaChalkboardTeacher /> },
    { to: "/about", label: "About", icon: <FaInfoCircle /> },
    { to: "/contact", label: "Contact", icon: <FaEnvelope /> },
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  ].map((item) => (
    <NavLink
      key={item.to}
      to={item.to}
      onClick={() => setMobileOpen(false)}
      className={({ isActive }) =>
        `px-3 py-2 rounded-lg transition ${
          isActive
            ? "text-primary-500 underline text-white"
            : "hover:bg-base-200"
        }`
      }
    >
      <div className="flex items-center gap-2">
        {item.icon}
        {item.label}
      </div>
    </NavLink>
  ));

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
  
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden text-primary-400"
        >
          <FiMenu size={24} />
        </button>

        {/* Logo */}
        <Link to="/" className="hidden lg:flex">
          <Logo />
        </Link>

      
        <div className="hidden lg:flex gap-1">{links}</div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <label className="swap swap-rotate hidden lg:flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="theme-controller"
              onChange={handleThemeToggle}
            />
            <span className="swap-off flex items-center gap-2 text-base font-medium">
              <FaSun size={18} />
              Light
            </span>
            <span className="swap-on flex items-center gap-2 text-base font-medium">
              <FaRegMoon size={18} />
              Dark
            </span>
          </label>

          {/* User menu */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="avatar cursor-pointer">
                <div className="w-8 rounded-full">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="User" />
                  ) : (
                    <FaUserCircle size={32} />
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/dashboard/profile-settings">
                    <FaUser className="mr-2" /> Profile
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FaTachometerAlt className="mr-2" /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/help">
                    <FaQuestionCircle className="mr-2" /> Help
                  </Link>
                </li>
                <li>
                  <button onClick={handleSignOut}>
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="btn btn-outline btn-primary btn-sm rounded-full"
              >
                Login / Register
              </Link>
              <Link className="flex" to="/help">
                <FaQuestionCircle size={20} className="mt-2" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-1/2 bg-base-100 z-50
        transform transition-transform duration-300 lg:hidden
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <Logo />
          <button onClick={() => setMobileOpen(false)}>
            <FiX size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">{links}</nav>

        <div className="p-4 border-t mt-auto">
          {/* Mobile theme toggle */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              onChange={handleThemeToggle}
            />
            <span className="swap-off text-lg">
              <FaSun />
            </span>
            <span className="swap-on text-lg">
              <FaRegMoon />
            </span>
          </label>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
