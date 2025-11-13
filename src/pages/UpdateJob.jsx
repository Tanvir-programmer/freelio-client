import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    category: "",
    summary: "",
    coverImage: "",
  });

  // ✅ Fetch existing job data
  useEffect(() => {
    fetch(`https://freelio-server.vercel.app/allJobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch(() => toast.error("Failed to load job details"));
  }, [id]);

  // ✅ Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  // ✅ Update job in backend
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://freelio-server.vercel.app/updateJob/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Job updated successfully");
        setTimeout(() => navigate("/alljobs"), 1500);
      })
      .catch(() => toast.error("Failed to update job"));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 border border-gray-100">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Update Job
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={job.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="text"
          name="category"
          value={job.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border rounded-lg"
        />
        <textarea
          name="summary"
          value={job.summary}
          onChange={handleChange}
          placeholder="Summary"
          className="w-full p-2 border rounded-lg h-24"
        />
        <input
          type="text"
          name="coverImage"
          value={job.coverImage}
          onChange={handleChange}
          placeholder="Cover Image URL"
          className="w-full p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 w-full transition"
        >
          Update Job
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default UpdateJob;
