import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CheckCircle, Trash2, Loader, AlertTriangle } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AcceptTask = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch accepted jobs for the logged-in user
  const fetchAcceptedJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://freelio-server.vercel.app/accepted-jobs?email=${user.email}`
      );
      setJobs(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch accepted jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchAcceptedJobs();
  }, [user]);

  // Mark job as DONE
  const markAsDone = async (jobId) => {
    try {
      await axios.patch(
        `https://freelio-server.vercel.app/accepted-job-done/${jobId}`,
        { email: user.email }
      );
      toast.success("Job marked as DONE!");
      // Remove the job from UI instantly
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark job as done.");
    }
  };

  // Cancel accepted job
  const cancelJob = async (jobId) => {
    try {
      await axios.patch(
        `https://freelio-server.vercel.app/accepted-job/${jobId}`,
        { email: user.email }
      );
      toast.success("Job cancelled!");
      // Remove the job from UI instantly
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel job.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader className="animate-spin w-10 h-10 text-indigo-600" />
        <p className="mt-4 text-gray-700 text-lg">Loading accepted tasks...</p>
      </div>
    );
  }

  if (error || jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-gray-600 text-center text-lg">
          {error || "No accepted tasks found."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="bg-white p-4 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {job.title}
            </h2>
            <p className="text-gray-600 mb-1">
              <strong>Category:</strong> {job.category}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Posted By:</strong> {job.postedBy}
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => cancelJob(job._id)}
              className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
            >
              <Trash2 className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={() => markAsDone(job._id)}
              className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
            >
              <CheckCircle className="w-4 h-4" />
              Done
            </button>
          </div>
        </div>
      ))}
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
};

export default AcceptTask;
