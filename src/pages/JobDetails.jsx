import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Loader, AlertTriangle } from "lucide-react";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`http://localhost:3000/allJobs/${id}`);
        setJob(response.data);
      } catch (err) {
        console.error("Error fetching job:", err);
        if (err.response && err.response.status === 404) {
          setError("Job not found.");
        } else {
          setError("Failed to fetch job details. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader className="animate-spin w-10 h-10 text-indigo-600" />
        <p className="mt-4 text-lg text-gray-700">Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-red-100 rounded-lg my-5">
        <AlertTriangle className="w-10 h-10 text-red-600 mb-2" />
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-700 mb-2">
        <strong>Category:</strong> {job.category}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Posted By:</strong> {job.postedBy}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Description:</strong> {job.summary}
      </p>
    </div>
  );
};

export default JobDetails;
