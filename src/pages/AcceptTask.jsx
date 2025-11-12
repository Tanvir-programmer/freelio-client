import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AcceptTask = () => {
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcceptedJobs = async () => {
      setLoading(true);
      try {
        // For demo, using localStorage
        const localAcceptedJobs = JSON.parse(localStorage.getItem("acceptedJobs")) || [];
        setAcceptedJobs(localAcceptedJobs);
      } catch {
        toast.error("Failed to load accepted tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedJobs();
  }, []);

  const handleRemoveJob = async (jobId, type) => {
    try {
      await axios.delete(`https://freelio-server.vercel.app/deleteJob/${jobId}`);
      const updatedJobs = acceptedJobs.filter((job) => job._id !== jobId);
      setAcceptedJobs(updatedJobs);
      localStorage.setItem("acceptedJobs", JSON.stringify(updatedJobs));
      toast.success(`Job ${type === "done" ? "marked DONE" : "CANCELLED"} successfully!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove job");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading accepted tasks...</p>;

  if (!acceptedJobs.length)
    return <p className="text-center mt-10 text-gray-600">No accepted tasks yet.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Accepted Tasks</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {acceptedJobs.map((job) => (
          <div
            key={job._id}
            className="p-4 bg-white rounded-lg shadow flex flex-col justify-between border border-gray-100"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-700 mb-1">
                <strong>Category:</strong> {job.category}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Posted By:</strong> {job.postedBy}
              </p>
              <p className="text-gray-700 mb-2">{job.summary}</p>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleRemoveJob(job._id, "done")}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                <CheckCircle /> DONE
              </button>
              <button
                onClick={() => handleRemoveJob(job._id, "cancel")}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
              >
                <XCircle /> CANCEL
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default AcceptTask;
