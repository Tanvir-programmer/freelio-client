import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Briefcase,
  Loader,
  AlertTriangle,
  Filter,
  Search,
  ArrowUpDown,
} from "lucide-react";
import JobCard from "./JobCard";
import { AuthContext } from "../context/AuthContext";

const API_URL = "https://freelio-server.vercel.app/allJobs";

const AllJobs = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [sortedJobs, setSortedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(API_URL);
        const fetchedJobs = response.data.map((job) => ({
          ...job,
          postedAt: job.postedAt ? new Date(job.postedAt) : new Date(0),
        }));
        setJobs(fetchedJobs);
      } catch (err) {
        setError(
          err.request
            ? "Network Error: Could not connect to server."
            : err.message,
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = jobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const sorted = [...filtered].sort((a, b) => {
      const aT = a.postedAt.getTime();
      const bT = b.postedAt.getTime();
      return sortOrder === "newest" ? bT - aT : aT - bT;
    });
    setSortedJobs(sorted);
  }, [jobs, sortOrder, searchTerm]);

  if (isLoading || authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#fdf7f0]">
        <Loader className="w-10 h-10 animate-spin text-[#357266]" />
        <p className="mt-4 text-[#1e3d37] font-medium italic">
          Curating opportunities...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf7f0] pb-20">
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-8 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-[#1e3d37] flex items-center gap-3">
                <Briefcase className="text-[#357266]" size={36} />
                Available Roles
                <span className="text-sm font-normal bg-[#357266]/10 text-[#357266] px-3 py-1 rounded-full">
                  {jobs.length} total
                </span>
              </h1>
              <p className="mt-2 text-gray-500 text-lg">
                {user
                  ? `Welcome back, ${user.displayName || "Expert"}`
                  : "Join the world's most elite freelance network."}
              </p>
            </div>

            {/* SEARCH & SORT BAR */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-grow md:flex-grow-0">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#357266] outline-none w-full md:w-64"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                <div className="p-2 text-gray-500">
                  <ArrowUpDown size={18} />
                </div>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="bg-transparent pr-4 py-1 text-sm font-semibold text-[#1e3d37] outline-none cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-6 lg:px-20 mt-12">
        {error ? (
          <div className="bg-red-50 border border-red-100 p-8 rounded-2xl text-center">
            <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
            <h2 className="text-red-900 font-bold text-xl">Connection Issue</h2>
            <p className="text-red-700 mt-2">{error}</p>
          </div>
        ) : sortedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
};

const EmptyState = () => (
  <div className="max-w-md mx-auto py-20 text-center">
    <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
      <Filter className="text-gray-300" size={32} />
    </div>
    <h3 className="text-2xl font-bold text-[#1e3d37]">No matches found</h3>
    <p className="mt-3 text-gray-500">
      We couldn't find any jobs matching your current search or filters. Try
      adjusting your keywords.
    </p>
  </div>
);

export default AllJobs;
