import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CheckCircle, Trash2, Loader, AlertTriangle, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AcceptTask = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalJobId, setModalJobId] = useState(null);

  // Fetch accepted jobs for logged-in user
  const fetchAcceptedJobs = async () => {
    if (!user?.email) {
      setJobs([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://freelio-server.vercel.app/accepted-jobs?email=${user.email}`,
      );
      // Ensure _id is string for React keys
      const jobsWithStringId = response.data.map((job) => ({
        ...job,
        _id: job._id?.toString() || job._id,
      }));
      setJobs(jobsWithStringId);
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch accepted jobs.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Mark job as done
  const markAsDone = async (jobId) => {
    try {
      await axios.patch(
        `https://freelio-server.vercel.app/accepted-job-done/${jobId}`,
        { email: user.email },
      );
      toast.success("✅ Job marked as DONE!");
      fetchAcceptedJobs(); // Refresh list
    } catch (err) {
      console.error("Mark done error:", err);
      toast.error("❌ Failed to mark job as done.");
    }
  };

  // Cancel job
  const cancelJob = async (jobId) => {
    try {
      await axios.patch(
        `https://freelio-server.vercel.app/accepted-job/${jobId}`,
        { email: user.email },
      );
      toast.success("✅ Job cancelled!");
      fetchAcceptedJobs(); // Refresh list
      setModalJobId(null);
    } catch (err) {
      console.error("Cancel error:", err);
      toast.error("❌ Failed to cancel job.");
    }
  };

  useEffect(() => {
    fetchAcceptedJobs();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <Loader className="animate-spin w-12 h-12 text-indigo-600 mb-4" />
        <p className="text-xl text-gray-700">Loading your accepted tasks...</p>
      </div>
    );
  }

  if (error && jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          No Tasks Found
        </h2>
        <p className="text-gray-600 text-lg mb-4">{error}</p>
        <p className="text-gray-500">Accept some jobs to see them here!</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Accepted Tasks
          </h1>
          <p className="text-gray-600">
            Manage your accepted freelance jobs ({jobs.length} active)
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-20">
            <AlertTriangle className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Accepted Tasks
            </h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Browse available jobs and accept some to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-4">
                  {job.coverImage && (
                    <img
                      src={job.coverImage}
                      alt={job.title}
                      className="w-full h-40 object-cover rounded-xl mb-4"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {job.title}
                  </h3>
                  <div className="space-y-1 mb-4">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="font-medium">Category:</span>
                      <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium">
                        {job.category}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Posted by:{" "}
                      <span className="font-medium">{job.postedBy}</span>
                    </p>
                    {job.summary && (
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {job.summary}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setModalJobId(job._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-100 transition-all duration-200 hover:scale-[1.02]"
                    title="Cancel this job"
                  >
                    <Trash2 className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={() => markAsDone(job._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-50 text-green-600 border border-green-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-100 transition-all duration-200 hover:scale-[1.02]"
                    title="Mark as completed"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {modalJobId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-8 relative z-10 animate-in fade-in zoom-in duration-200">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Confirm Cancellation
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Are you sure you want to cancel this job? <br />
                <span className="font-medium text-red-600">
                  This cannot be undone.
                </span>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => cancelJob(modalJobId)}
                className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Yes, Cancel Job
              </button>
              <button
                onClick={() => setModalJobId(null)}
                className="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Keep Job
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default AcceptTask;
