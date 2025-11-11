import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
      <h1 className="text-9xl font-extrabold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8">
        Oops! The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
