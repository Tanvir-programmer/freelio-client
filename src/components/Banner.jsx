import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Search } from "lucide-react";
import { NavLink } from "react-router";

const Banner = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.2, duration: 0.6 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-[#fdf7f0] min-h-[600px] flex items-center px-6 lg:px-20 py-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <Motion.h1 className="text-5xl lg:text-7xl font-bold text-[#1e3d37] leading-tight">
            Hire Experts & Get Your <br /> Any Job Done
          </Motion.h1>

          <Motion.p className="text-gray-500 text-lg max-w-md leading-relaxed">
            Work with talented people at the most affordable price to get the
            most out of your time and cost.
          </Motion.p>

          <Motion.div className="bg-white p-2 rounded-xl shadow-xl flex flex-col md:flex-row items-center border border-gray-100 max-w-2xl">
            <div className="flex items-center px-4 py-2 w-full border-b md:border-b-0 md:border-r border-gray-200">
              <Search className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                placeholder="What are you looking for?"
                className="outline-none w-full text-gray-700 placeholder-gray-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-[#357266] hover:bg-[#2a5a51] text-white px-10 py-4 rounded-lg font-semibold transition-all w-full md:w-auto"
            >
              <NavLink to="alljobs">Search</NavLink>
            </button>
          </Motion.div>

          <div className="pt-8">
            <p className="text-gray-400 text-sm mb-4">Trusted by</p>
            <div className="flex flex-wrap gap-8 opacity-60 grayscale">
              <span className="text-xl font-bold italic text-gray-700 underline decoration-orange-500">
                amazon
              </span>
              <span className="text-xl font-bold text-gray-700">AMD</span>
              <span className="text-xl font-semibold text-gray-700">
                logitech
              </span>
              <span className="text-xl font-bold text-gray-700">Spotify</span>
            </div>
          </div>
        </Motion.div>

        <div className="relative h-[500px] w-full hidden md:block">
          <Motion.div
            variants={imageVariants}
            className="absolute left-0 top-0 w-2/3 h-full rounded-2xl overflow-hidden shadow-2xl z-10"
          >
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
              alt="Expert"
              className="w-full h-full object-cover"
            />
          </Motion.div>
          <Motion.div
            variants={imageVariants}
            className="absolute right-0 top-0 w-1/3 h-[45%] rounded-2xl overflow-hidden bg-[#fce4ec] z-20 shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=300"
              alt="Freelancer"
              className="w-full h-full object-cover mix-blend-multiply"
            />
          </Motion.div>
          <Motion.div
            variants={imageVariants}
            className="absolute right-0 bottom-0 w-1/3 h-[50%] rounded-2xl overflow-hidden bg-white z-20 shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=300"
              alt="Professional"
              className="w-full h-full object-cover"
            />
          </Motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
