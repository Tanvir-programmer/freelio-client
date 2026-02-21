import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { NavLink } from "react-router";

const Trust = () => {
  return (
    <section className="bg-[#fdf7f0] py-20 px-6 lg:px-20 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE: STAGGERED CARDS (Matching the second photo style) */}
        <div className="relative h-[550px] hidden md:block">
          {/* Top-Left Card (List of Freelancers) */}
          <div className="absolute top-0 left-0 w-64 bg-white p-6 rounded-2xl shadow-xl z-10 border border-gray-100">
            <p className="text-[#357266] font-bold text-sm mb-4">
              200+ Verified Freelancer
            </p>
            <div className="space-y-4">
              {[
                {
                  name: "Marvin McKinney",
                  role: "Designer",
                  img: "https://i.pravatar.cc/150?u=1",
                },
                {
                  name: "Ralph Edwards",
                  role: "Developer",
                  img: "https://i.pravatar.cc/150?u=2",
                },
                {
                  name: "Annette Black",
                  role: "Manager",
                  img: "https://i.pravatar.cc/150?u=3",
                },
              ].map((person, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img
                    src={person.img}
                    className="w-10 h-10 rounded-full object-cover"
                    alt=""
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      {person.name}
                    </p>
                    <p className="text-xs text-gray-400">{person.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Focused Card (Kristin Watson style) */}
          <div className="absolute top-24 right-4 w-72 bg-white p-8 rounded-3xl shadow-2xl z-20 border border-gray-100 transform translate-x-4">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/150?u=9"
                  className="w-24 h-24 rounded-full border-4 border-[#fdf7f0] shadow-md mb-4"
                  alt="Pro"
                />
                <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
              </div>
              <h4 className="text-xl font-bold text-gray-800">
                Kristin Watson
              </h4>
              <p className="text-gray-400 text-sm mb-2">Expert Developer</p>
              <p className="text-[#357266] font-bold text-sm mb-4">
                ⭐ 4.9 (595 reviews)
              </p>

              <div className="flex gap-2 mb-6">
                {["React", "Node", "UI/UX"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="w-full grid grid-cols-3 gap-2 border-t pt-4">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">
                    Location
                  </p>
                  <p className="text-xs font-bold">London</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Rate</p>
                  <p className="text-xs font-bold">$90/hr</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Success</p>
                  <p className="text-xs font-bold">98%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: CONTENT */}
        <div className="space-y-8">
          <div>
            <h2 className="text-5xl font-bold text-[#1e3d37] leading-tight mb-6">
              Trusted By Best <br /> Professionals
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Freelio is built to create secure, transparent, and reliable
              collaborations between clients and professionals — ensuring every
              project is protected.
            </p>
          </div>

          <div className="space-y-6">
            {[
              "Verified Profiles & Strict Security",
              "Secure Escrow Milestone Payments",
              "Intelligent Skill-Based Matching",
              "24/7 Dedicated Dispute Support",
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#357266] flex items-center justify-center text-white shadow-lg shadow-[#357266]/20 group-hover:scale-110 transition-transform">
                  <FiCheckCircle size={18} />
                </div>
                <p className="text-lg font-semibold text-[#1e3d37]">{text}</p>
              </div>
            ))}
          </div>

          <button className="mt-4 px-10 py-4 bg-[#1e3d37] hover:bg-[#357266] text-white font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center gap-3 group">
            <NavLink to="/trust"> See More</NavLink>
            <span className="group-hover:translate-x-1 transition-transform">
              ↗
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Trust;
