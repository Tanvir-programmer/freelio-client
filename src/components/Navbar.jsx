import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  FiLogIn,
  FiUser,
  FiLogOut,
  FiMoon,
  FiSun,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, signOutUser, setUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Theme Management
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOutUser();
      setUser(null);
      setDropdownOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Jobs", path: "/alljobs" },
    { name: "Add Jobs", path: "/addjobs" },
    { name: "Accepted Task", path: "/acceptedtask" },
    { name: "About Us", path: "/about" },
  ];

  const activeLinkStyle = ({ isActive }) =>
    `transition-colors duration-200 font-medium ${
      isActive ? "text-[#387d61] dark:text-[#387d61]" : "hover:text-[#387d61]"
    }`;

  return (
    <nav className="navbar bg-base-100 dark:bg-gray-900 shadow-md px-4 md:px-8 sticky top-0 z-50">
      {/* Branding */}
      <div className="navbar-start">
        <div
          to="/"
          className="text-2xl font-extrabold tracking-tight flex items-center "
        >
         <NavLink to="/"> Free<span className="text-[#387d61]">lio</span></NavLink>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex space-x-8 text-sm uppercase tracking-wide">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} className={activeLinkStyle}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions (Auth & Theme) */}
      <div className="navbar-end space-x-3">
        {!user ? (
          <div className="flex items-center space-x-2">
            <Link
              to="/login"
              className="btn btn-ghost btn-sm normal-case hidden sm:flex"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-primary btn-sm normal-case bg-green-700 border-none hover:bg-green-600 px-6"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center focus:outline-none transition-transform hover:scale-105"
              >
                <img
                  src={
                    user.photoURL ||
                    "https://ui-avatars.com/api/?name=" + user.email
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-[#387d61] object-cover shadow-sm"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-xl py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-3 border-b dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Signed in as
                    </p>
                    <p className="text-sm font-semibold truncate dark:text-white">
                      {user.displayName || user.email}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#387d61]/10"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FiUser className="mr-3 text-[#387d61]" /> My Profile
                  </Link>

                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#387d61]/10"
                  >
                    {isDarkMode ? (
                      <FiSun className="mr-3 text-yellow-500" />
                    ) : (
                      <FiMoon className="mr-3 text-[#387d61]" />
                    )}
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                  </button>

                  <div className="border-t dark:border-gray-700 mt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700"
                    >
                      <FiLogOut className="mr-3" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Toggle Button */}
        <button
          className="btn btn-ghost lg:hidden p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-base-100 dark:bg-gray-900 border-t shadow-xl py-4 flex flex-col items-center space-y-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={activeLinkStyle}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
