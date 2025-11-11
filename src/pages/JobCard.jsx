import React, { useContext } from "react";
import { Briefcase, User, DollarSign } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";

const JobCard = ({ job }) => {
  const { user } = useContext(AuthContext);
  const category = job.category || "Uncategorized";
  const summary = job.summary
    ? job.summary.substring(0, 100) + "..."
    : "Detailed description pending.";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition duration-300">
      <div className="bg-indigo-600 h-20 flex items-center justify-between p-4 text-white">
        <h3 className="text-sm font-semibold uppercase tracking-wider">
          {category}
        </h3>
        <Briefcase className="w-6 h-6" />
      </div>

      <div className="p-5 flex-grow">
        <h2 className="text-xl font-extrabold text-gray-900 mb-2">
          {job.title || "Job Title Missing"}
        </h2>

        <div className="flex justify-between items-center text-sm mb-3">
          <p className="text-gray-600 flex items-center">
            <User className="w-4 h-4 mr-1 text-indigo-500" />
            {user ? user.displayName || user.email : "Anonymous User"}
          </p>
          <span className="font-bold text-green-700 flex items-center text-base">
            <DollarSign className="w-4 h-4 mr-1" />
            {job.salary ? job.salary.toLocaleString() : "Negotiable"}
          </span>
        </div>

        <p className="text-gray-700 text-sm mb-4">{summary}</p>
      </div>

      <div className="p-5 border-t border-gray-100">
        <Link
          to={`/allJobs/${job._id}`}
          className="w-full p-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition duration-150 shadow-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
