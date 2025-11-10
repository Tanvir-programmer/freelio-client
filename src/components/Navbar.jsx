import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { FiLogIn } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  return (
    <div className="navbar bg-base-100 shadow-sm">
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li className=" hover:text-blue-500 ">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="hover:text-blue-500 ">
              <NavLink to="/alljobs">All Jobs</NavLink>
            </li>
            <li className="hover:text-blue-500 ">
              <NavLink to="/addjobs">Add Jobs</NavLink>
            </li>
          </ul>
        </div>
        <div className="">
          <img
            className="object-cover h-17 w-17 rounded-full"
            src="https://i.ibb.co/CKbBTDzB/Chat-GPT-Image-Nov-9-2025-09-10-22-AM.png"
            alt=""
          />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className="hover:text-blue-500 ">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="hover:text-blue-500 ">
            <NavLink to="/alljobs">All Jobs</NavLink>
          </li>
          <li className="hover:text-blue-500 ">
            <NavLink to="/addjobs">Add Jobs</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {!user && (
          <>
            <Link to="/login" className="btn btn-outline mr-2">
              Login <FiLogIn></FiLogIn>
            </Link>
            <Link
              to="/register"
              className="btn btn-primary bg-green-700 hover:bg-green-600 "
            >
              Register <FiLogIn></FiLogIn>
            </Link>
          </>
        )}

        {user && (
          <div className="flex items-center space-x-2">
            <div className="relative group">
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full cursor-pointer"
              />

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                {user.displayName}
              </div>
            </div>
            <button
              className="btn bg-green-700 hover:bg-green-600 text-white"
              onClick={signOutUser}
            >
              LogOut <FiLogIn></FiLogIn>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
