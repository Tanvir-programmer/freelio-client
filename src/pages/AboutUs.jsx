import React from "react";
import { FiTarget, FiUsers, FiAward, FiCheckCircle } from "react-icons/fi";

const AboutUs = () => {
  const stats = [
    {
      label: "Active Freelancers",
      value: "10K+",
      icon: <FiUsers className="text-[#387d61]" />,
    },
    {
      label: "Jobs Completed",
      value: "25K+",
      icon: <FiCheckCircle className="text-[#387d61]" />,
    },
    {
      label: "Client Satisfaction",
      value: "99%",
      icon: <FiAward className="text-[#387d61]" />,
    },
  ];

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#387d61] to-[#2f684f] text-white rounded-b-3xl">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Empowering the Future of Work
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Freelio connects world-class talent with innovative companies. We
            build bridges between ambition and opportunity.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FiTarget className="text-[#387d61]" />
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At <span className="font-bold text-[#387d61]">Freelio</span>, we
              believe talent has no borders. Our platform enables freelancers to
              thrive and businesses to scale efficiently.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We focus on transparency, security, and performance — building a
              trusted digital marketplace.
            </p>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Team Collaboration"
              className="rounded-3xl shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg hidden md:block">
              <p className="text-[#387d61] font-bold text-lg italic">
                "The best way to predict the future is to create it."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#f3faf7] py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-md transition"
              >
                <div className="text-3xl mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2 text-[#387d61]">
                  {stat.value}
                </div>
                <div className="text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">
          Why Professionals Choose Freelio
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition text-center">
            <h3 className="text-xl font-semibold text-[#387d61] mb-3">
              Verified Talent
            </h3>
            <p className="text-gray-500 text-sm">
              Every freelancer undergoes a screening process to ensure top
              quality work.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition text-center">
            <h3 className="text-xl font-semibold text-[#387d61] mb-3">
              Secure Payments
            </h3>
            <p className="text-gray-500 text-sm">
              Our escrow system protects both clients and freelancers.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition text-center">
            <h3 className="text-xl font-semibold text-[#387d61] mb-3">
              24/7 Support
            </h3>
            <p className="text-gray-500 text-sm">
              Dedicated support to help you at every stage.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="bg-[#387d61] rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to start your journey?
          </h2>
          <p className="mb-10 opacity-90">
            Join thousands of companies and freelancers working together.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-[#387d61] font-semibold rounded-xl hover:bg-gray-100 transition">
              Hire Talent
            </button>
            <button className="px-8 py-3 border border-white text-white font-semibold rounded-xl hover:bg-white hover:text-[#387d61] transition">
              Find a Job
            </button>
          </div>

          <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl -mr-24 -mt-24"></div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
