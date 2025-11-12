import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { Loader, AlertTriangle, Briefcase } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleAcceptJob = () => {
    const acceptedJobs = JSON.parse(localStorage.getItem("acceptedJobs")) || [];
    const alreadyAccepted = acceptedJobs.some((item) => item._id === job._id);

    if (alreadyAccepted) {
      toast.info("You have already accepted this job!");
      return;
    }

    acceptedJobs.push(job);
    localStorage.setItem("acceptedJobs", JSON.stringify(acceptedJobs));
    toast.success("Job accepted successfully!");
    setTimeout(() => navigate("/my-accepted-tasks"), 1500);
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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <Briefcase className="text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
      </div>

      <img
        src={job.cover || "https://via.placeholder.com/800x400?text=Job+Cover"}
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

      <button
        onClick={handleAcceptJob}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
      >
        Accept Job
      </button>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default JobDetails;
