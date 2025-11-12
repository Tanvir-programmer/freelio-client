import React, { useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";

const AddJobs = () => {
  const { user } = useContext(AuthContext);

  const [jobData, setJobData] = useState({
    title: "",
    category: "Web Development",
    summary: "",
    cover: "",
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    "Web Development",
    "Digital Marketing",
    "Graphic Designing",
    "Mobile App",
    "Content Writing",
    "Others",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to add a job!");
      return;
    }

    const postData = {
      title: jobData.title,
      category: jobData.category,
      summary: jobData.summary,
      coverImage: jobData.cover, // ✅ match backend
      postedBy: user.displayName,
      email: user.email,
      postedAt: new Date().toISOString(),
    };

    try {
      setLoading(true);
      await axios.post("https://freelio-server.vercel.app/postJob", postData);
      toast.success("Job posted successfully!");
      setJobData({
        title: "",
        category: "Web Development",
        summary: "",
        cover: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to post job. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 grid md:grid-cols-2 gap-10">
      {/* Form */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          Post a New Job
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Job Title</label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              placeholder="Enter job title"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Category</label>
            <select
              name="category"
              value={jobData.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Job Summary</label>
            <textarea
              name="summary"
              value={jobData.summary}
              onChange={handleChange}
              placeholder="Describe the job in detail"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition h-32"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Cover Image URL</label>
            <input
              type="text"
              name="cover"
              value={jobData.cover}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Posted By</label>
              <input
                type="text"
                value={user?.displayName || ""}
                disabled
                className="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">User Email</label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>

      {/* Live Preview */}
      <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Live Preview</h3>
        <div className="flex flex-col gap-4">
          <div className="p-4 border rounded-lg bg-white shadow-sm">
            <h4 className="text-xl font-semibold text-indigo-600">{jobData.title || "Job Title"}</h4>
            <p className="text-gray-600"><strong>Category:</strong> {jobData.category}</p>
            <p className="text-gray-600 mt-2">{jobData.summary || "Job summary will appear here..."}</p>
            {jobData.cover ? (
              <img src={jobData.cover} alt="Cover" className="mt-4 rounded-md max-h-64 object-cover w-full" />
            ) : (
              <div className="mt-4 h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                Cover image preview
              </div>
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default AddJobs;
