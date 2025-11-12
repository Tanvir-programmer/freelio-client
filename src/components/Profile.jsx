import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 h-24 w-full"></div>

        {/* Profile Info */}
        <div className="px-6 -mt-12 flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
            src={user.photoURL || "https://via.placeholder.com/150"}
            alt={user.displayName}
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {user.displayName}
          </h2>
          <p className="text-gray-500">{user.email}</p>

          {/* Account Details */}
          <div className="mt-6 w-full bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">UID:</span>
              <span className="text-gray-800">{user.uid}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Email Verified:</span>
              <span className="text-gray-800">
                {user.emailVerified ? "No" : "Yes"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Joined:</span>
              <span className="text-gray-800">
                {new Date(user.metadata?.creationTime).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
