import React from "react";
import { Link } from "react-router";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 flex flex-col">
      {/* Job Image */}
      <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
        <img
          src={
            job.coverImage ||
            "https://via.placeholder.com/400x200?text=No+Image"
          }
          alt={job.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Job Info */}
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{job.title}</h3>
      <p className="text-gray-600 mb-1">
        <strong>Category:</strong> {job.category}
      </p>
      <p className="text-gray-600 mb-3 text-sm truncate">{job.summary}</p>

      {/* Link to Job Details */}
      <Link
        // FIX APPLIED: Used job._id instead of undefined 'id'
        // and removed the incorrect ':' from the path value.
        to={`/allJobs/${job._id}`}
        className="mt-auto inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition text-center"
      >
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
