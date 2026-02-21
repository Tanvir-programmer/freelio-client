import React from "react";
import { Link } from "react-router";
import { ArrowRight, Tag, Clock } from "lucide-react";

const JobCard = ({ job }) => {
  // Fallback image logic (Keeping your exact functionality)
  const imageSrc =
    job.coverImage ||
    job.cover ||
    job.image ||
    "https://via.placeholder.com/400x200?text=No+Image";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Job Image with Gradient Overlay */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={imageSrc}
          alt={job.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e3d37]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-[#357266] text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Tag size={12} />
            {job.category}
          </span>
        </div>
      </div>

      {/* Job Info Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-[#1e3d37] group-hover:text-[#357266] transition-colors duration-300 line-clamp-1">
            {job.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-gray-400 text-xs">
            <Clock size={14} />
            <span>Remote / Freelance</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6">
          {job.summary}
        </p>

        {/* View Details - Styled to match Banner Button */}
        <Link
          to={`/allJobs/${job._id}`}
          className="mt-auto flex items-center justify-center gap-2 bg-[#357266] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#2a5a51] transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#357266]/20"
        >
          View Details
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;