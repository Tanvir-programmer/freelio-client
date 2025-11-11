import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Briefcase, Loader, AlertTriangle } from "lucide-react";
import JobCard from "./JobCard";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const API_URL = "http://localhost:3000/alljobs";

const Alljobs = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {}, [authLoading, user, navigate]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(API_URL);
        setJobs(response.data);
      } catch (err) {
        if (err.request) {
          setError(
            "Network Error: Could not connect to the server. Is your backend running on port 3000?"
          );
        } else {
          setError(`Failed to retrieve data: ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (isLoading || authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
        <Loader className="w-10 h-10 mr-3 animate-spin text-indigo-600" />
        <p className="mt-4 text-lg font-medium text-gray-700">
          Loading jobs and user data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 bg-red-100 flex flex-col items-center justify-center rounded-xl shadow-lg m-4">
        <AlertTriangle className="w-10 h-10 text-red-600 mb-4" />
        <h1 className="text-xl font-bold text-red-800 mb-2">
          Error: Failed to Load Jobs
        </h1>
        <p className="text-red-700 text-center max-w-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-inter">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 border-b-4 border-indigo-500 pb-2 inline-block">
          <Briefcase className="inline w-8 h-8 text-indigo-500 mr-3" />
          Freelio Job Board ({jobs.length})
        </h1>
        <p className="mt-3 text-gray-600 text-lg">
          {user
            ? `Welcome, ${user.displayName || user.email}!`
            : "Browse all available freelance opportunities."}
        </p>
      </header>
      <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job._id || job.title} job={job} />)
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
};

const EmptyState = () => (
  <div className="col-span-full p-10 text-center bg-white rounded-xl shadow-lg border border-gray-200">
    <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-gray-700">No Jobs Found</h3>
    <p className="mt-2 text-gray-500">
      Your job board is currently empty. Start by adding new jobs to your
      MongoDB collection!
    </p>
  </div>
);

export default Alljobs;
