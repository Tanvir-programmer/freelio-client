import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, Loader, AlertTriangle, Briefcase } from "lucide-react";

import JobCard from "../pages/JobCard";

const API_URL = "https://freelio-server.vercel.app/latestjobs";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 2. Fetch the latest 6 jobs from the backend
        const response = await axios.get(API_URL);

        setJobs(response.data);
      } catch (err) {
        console.error("Error fetching latest jobs:", err);

        setError(
          "Failed to load featured jobs. Please ensure your Express server is running on port 3000."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestJobs();
  }, []);

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="text-center p-8">
        <Loader className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
        <p className="mt-4 text-lg text-gray-700">
          Loading the newest opportunities...
        </p>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="p-6 text-center bg-red-100 border border-red-300 rounded-lg max-w-lg mx-auto my-8">
        <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-red-800 mb-2">
          Data Fetch Error
        </h3>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  // --- Success/Display State ---
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 border-b-2 border-indigo-400 pb-2 inline-flex items-center">
            <Clock className="w-6 h-6 text-indigo-500 mr-2" />
            Latest Freelance Jobs
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            The newest 6 opportunities added to the platform.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            // Empty State if no jobs are found
            <div className="col-span-full p-10 text-center bg-white rounded-xl shadow-md border border-gray-200">
              <Briefcase className="w-10 h-10 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">
                No New Jobs
              </h3>
              <p className="mt-2 text-gray-500">
                Check back soon for new opportunities!
              </p>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default LatestJobs;
