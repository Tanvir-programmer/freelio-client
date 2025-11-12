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
    cover: "",
  });

  useEffect(() => {
    fetch(`https://your-api.vercel.app/allJobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch(() => toast.error("Failed to load job details"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://your-api.vercel.app/allJobs/${id}`, {
      method: "PATCH",
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
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Update Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={job.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="category"
          value={job.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="summary"
          value={job.summary}
          onChange={handleChange}
          placeholder="Summary"
          className="w-full p-2 border rounded h-24"
        />
        <input
          type="text"
          name="cover"
          value={job.cover}
          onChange={handleChange}
          placeholder="Cover Image URL"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Update Job
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default UpdateJob;
