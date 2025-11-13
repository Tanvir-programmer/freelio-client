import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";
import { Loader, AlertTriangle, Briefcase } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(
          `https://freelio-server.vercel.app/allJobs/${id}`
        );
        setJob(response.data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.status === 404
            ? "Job not found."
            : "Failed to fetch job details."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleAcceptJob = async () => {
    if (!user) {
      toast.error("You must be logged in to accept a job!");
      return;
    }
    try {
      const response = await axios.post(
        "https://freelio-server.vercel.app/acceptJob",
        {
          jobId: job._id,
          userEmail: user.email,
          userName: user.displayName,
        }
      );
      toast.success(response.data.message);
      setTimeout(() => navigate("/acceptedtask"), 1000);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to accept job. Try again."
      );
    }
  };

  const handleDeleteJob = async () => {
    if (!user || job.email !== user.email) {
      toast.error("You can only delete your own job!");
      return;
    }
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `https://freelio-server.vercel.app/deleteJob/${job._id}`
      );
      toast.success(response.data.message);
      setTimeout(() => navigate("/alljobs"), 1000);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete job");
    }
  };

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

  const isPoster = user && job && user.email === job.email;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <Briefcase className="text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
      </div>

      <img
        src={
          job.coverImage || "https://via.placeholder.com/800x400?text=Job+Cover"
        }
        alt={job.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <p className="text-gray-700 mb-3">
        <strong>Category:</strong> {job.category}
      </p>
      <p className="text-gray-700 mb-3">
        <strong>Posted By:</strong> {job.postedBy}
      </p>
      <p className="text-gray-700 mb-6 leading-relaxed">
        <strong>Description:</strong> {job.summary}
      </p>

      {isPoster ? (
        <div className="flex flex-col gap-3">
          <Link
            to={`/updatejob/${job._id}`}
            className="w-full block text-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Update Job
          </Link>
          <button
            onClick={handleDeleteJob}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Delete Job
          </button>
        </div>
      ) : (
        <button
          onClick={handleAcceptJob}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Accept Job
        </button>
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default JobDetails;
