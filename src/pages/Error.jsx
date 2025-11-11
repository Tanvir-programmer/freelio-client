import React from "react";
import { Link } from "react-router";
import { Frown } from "lucide-react";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 font-inter">
      {/* Container Card with subtle shadow */}
      <div className="bg-white p-10 sm:p-16 rounded-xl shadow-2xl max-w-lg w-full transform transition duration-500 hover:scale-[1.01] border-t-8 border-indigo-600">
        {/* Icon */}
        <Frown className="w-16 h-16 text-indigo-500 mx-auto mb-6" />

        <h1 className="text-8xl font-extrabold text-gray-900 mb-2 tracking-tight">
          404
        </h1>

        {/* Secondary Title */}
        <h2 className="text-4xl font-bold text-gray-700 mb-4">
          Page Not Found
        </h2>

        {/* Descriptive Text */}
        <p className="text-gray-500 mb-10 text-center leading-relaxed">
          We're sorry, but the page you requested could not be found. It may
          have been moved or deleted. Let's get you back on track.
        </p>

        {/* Action Button */}
        <Link
          to="/"
          className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02]"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Error;
