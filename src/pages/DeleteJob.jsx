import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader, AlertTriangle } from "lucide-react";

const DeleteJob = () => {
  const { id } = useParams(); // Get job ID from URL
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch job details to confirm ownership
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `https://freelio-server.vercel.app/allJobs/${id}`
        );
        setJob(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleDelete = async () => {
    if (!user) {
      toast.error("You must be logged in to delete a job!");
      return;
    }

    if (job.email !== user.email) {
      toast.error("You can only delete your own job!");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `https://freelio-server.vercel.app/allJobs/${id}`
      );

      toast.success(response.data.message || "Job deleted successfully!");

      // Navigate back after short delay
      setTimeout(() => navigate("/myjobs"), 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete job.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader className="animate-spin w-10 h-10 text-indigo-600" />
        <p className="mt-4 text-gray-700">Loading job details...</p>
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
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 border border-gray-100 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Delete Job: {job.title}
      </h2>
      <p className="text-gray-600 mb-6">
        This action cannot be undone. Are you sure you want to delete this job?
      </p>

      <div className="flex gap-4 justify-center">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default DeleteJob;
