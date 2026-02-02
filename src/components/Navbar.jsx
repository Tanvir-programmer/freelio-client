import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FiLogIn, FiUser, FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, signOutUser, setUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const darkMode = theme === "dark";

  // Persist theme to <html> and localStorage
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    signOutUser().then(() => {
      setUser(null);
      navigate("/login");
    });
  };

  return (
    <div className="navbar bg-base-100 dark:bg-gray-900 shadow-sm px-4">
      {/* Left: Logo & Mobile menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
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
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-box mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/alljobs">All Jobs</NavLink>
            </li>
            <li>
              <NavLink to="/addjobs">Add Jobs</NavLink>
            </li>
            <li>
              <NavLink to="/acceptedtask">Accepted Task</NavLink>
            </li>
          </ul>
        </div>
        {/* <img
          className="object-cover h-16 w-16 rounded-full"
          src="https://i.ibb.co/CKbBTDzB/Chat-GPT-Image-Nov-9-2025-09-10-22-AM.png"
          alt="Logo"
        /> */}
        <div className="font-bold text-2xl">
          Free<span className="text-indigo-600 font-bold text-2xl">lio</span>
        </div>
      </div>

      {/* Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-bold text-lg space-x-4 text-primary">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/alljobs">All Jobs</NavLink>
          </li>
          <li>
            <NavLink to="/addjobs">Add Jobs</NavLink>
          </li>
          <li>
            <NavLink to="/acceptedtask">Accepted Task</NavLink>
          </li>
        </ul>
      </div>

      {/* Right: Auth & Dark Mode */}
      <div className="navbar-end">
        {!user && (
          <>
            <Link to="/login" className="btn btn-outline mr-2">
              Login <FiLogIn />
            </Link>
            <Link
              to="/register"
              className="btn btn-primary bg-green-700 hover:bg-green-600"
            >
              Register <FiLogIn />
            </Link>
          </>
        )}

        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-50">
                <div className="px-4 py-2 text-gray-700 dark:text-gray-200 border-b">
                  {user.displayName || user.email}
                </div>

                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FiUser className="mr-2" /> Profile
                </Link>

                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {darkMode ? (
                    <FiSun className="mr-2" />
                  ) : (
                    <FiMoon className="mr-2" />
                  )}
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
