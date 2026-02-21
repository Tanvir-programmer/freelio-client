import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import {
  Loader,
  AlertTriangle,
  Briefcase,
  Users,
  Calendar,
} from "lucide-react";

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
        const res = await axios.get(
          `https://freelio-server.vercel.app/allJobs/${id}`,
        );
        setJob(res.data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.status === 404
            ? "Job not found."
            : "Failed to fetch job.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleAcceptJob = async () => {
    if (!user) return toast.error("You must be logged in to accept a job!");
    try {
      const res = await axios.post(
        "https://freelio-server.vercel.app/acceptJob",
        {
          jobId: job._id,
          userEmail: user.email,
          userName: user.displayName,
        },
      );
      toast.success(res.data.message);
      setTimeout(() => navigate("/acceptedtask"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to accept job");
    }
  };

  const handleDeleteJob = async () => {
    if (!user || user.email !== job.email)
      return toast.error("You can only delete your own job!");
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await axios.delete(
        `https://freelio-server.vercel.app/deleteJob/${job._id}`,
      );
      toast.success(res.data.message);
      setTimeout(() => navigate("/alljobs"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete job");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-20">
        <Loader className="animate-spin w-12 h-12 text-[#387d61]" />
        <p className="mt-4 text-lg text-gray-700">Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-red-50 rounded-xl">
        <AlertTriangle className="w-12 h-12 text-red-600 mb-3" />
        <p className="text-red-700 text-lg">{error}</p>
      </div>
    );
  }

  const isPoster = user && job && user.email === job.email;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 md:px-8 space-y-10">
      {/* Job Hero Section */}
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-2/3">
            <img
              src={
                job.coverImage ||
                "https://via.placeholder.com/1200x500?text=Job+Cover"
              }
              alt={job.title}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/3 p-6 flex flex-col justify-between space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {job.title}
              </h1>
              <p className="text-gray-700 mt-2">{job.summary}</p>
              <div className="flex flex-col mt-4 gap-2 text-gray-600 font-medium">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#387d61]" /> Posted by:{" "}
                  {job.postedBy}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#387d61]" /> Date:{" "}
                  {new Date(job.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#387d61]" /> Category:{" "}
                  {job.category}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {isPoster ? (
                <>
                  <Link
                    to={`/updatejob/${job._id}`}
                    className="w-full text-center bg-[#387d61] text-white py-3 rounded-xl hover:bg-[#2f684f] transition font-semibold"
                  >
                    Update Job
                  </Link>
                  <button
                    onClick={handleDeleteJob}
                    className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition font-semibold"
                  >
                    Delete Job
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAcceptJob}
                  className="w-full bg-[#387d61] text-white py-3 rounded-xl hover:bg-[#2f684f] transition font-semibold"
                >
                  Accept Job
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Job Details */}
      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold border-b-2 border-[#387d61] pb-2 inline-block">
          Job Description
        </h2>
        <p className="text-gray-700 leading-relaxed">{job.summary}</p>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default JobDetails;
