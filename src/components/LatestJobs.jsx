import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, Loader, AlertTriangle, Briefcase } from "lucide-react";
import JobCard from "../pages/JobCard";

const API_URL = "https://freelio-server.vercel.app/latestjobs";

const LatestJobs = ({ searchTerm = "" }) => {
  const [allJobs, setAllJobs] = useState([]); // Store master list
  const [filteredJobs, setFilteredJobs] = useState([]); // Store what we display
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestJobs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(API_URL);
        setAllJobs(response.data);
        setFilteredJobs(response.data); // Initially show all
      } catch (err) {
        setError("Failed to load featured jobs. Please check your connection.");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestJobs();
  }, []);

  // Handle filtering when searchTerm prop changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredJobs(allJobs);
    } else {
      const filtered = allJobs.filter(
        (job) =>
          job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.category?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredJobs(filtered);
    }
  }, [searchTerm, allJobs]);

  if (isLoading) {
    return (
      <div className="text-center p-20 bg-[#fdf7f0]">
        <Loader className="w-10 h-10 animate-spin mx-auto text-[#357266]" />
        <p className="mt-4 text-[#1e3d37] font-medium">
          Finding the best matches...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 text-center bg-red-50 max-w-2xl mx-auto my-8 rounded-2xl border border-red-100">
        <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <p className="text-red-700 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <header className="mb-12">
          <h2 className="text-4xl font-bold text-[#1e3d37] flex items-center gap-3">
            <Clock className="text-[#357266]" size={32} />
            Latest Opportunities
          </h2>
          {searchTerm && (
            <p className="mt-2 text-[#357266] font-medium">
              Showing results for: "{searchTerm}"
            </p>
          )}
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1e3d37]">
                No jobs found
              </h3>
              <p className="text-gray-500">Try searching for something else.</p>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default LatestJobs;
