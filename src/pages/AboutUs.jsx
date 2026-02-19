import React from "react";
import { FiTarget, FiUsers, FiAward, FiCheckCircle } from "react-icons/fi";

const AboutUs = () => {
  const stats = [
    {
      label: "Active Freelancers",
      value: "10K+",
      icon: <FiUsers className="text-indigo-600" />,
    },
    {
      label: "Jobs Completed",
      value: "25K+",
      icon: <FiCheckCircle className="text-indigo-600" />,
    },
    {
      label: "Client Satisfaction",
      value: "99%",
      icon: <FiAward className="text-indigo-600" />,
    },
  ];

  return (
    <div className="bg-base-100 text-base-content min-height-screen">
      {/* Hero Section */}
      <section className="py-16 bg-[#383497] text-white rounded-2xl">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Empowering the Future of Work
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Freelio is the premier destination for connecting world-class talent
            with innovative companies. We’re building a bridge between ambition
            and opportunity.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <FiTarget className="text-indigo-600" /> Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              At <span className="font-bold text-indigo-600">Freelio</span>, our
              mission is to democratize the global workforce. We believe that
              talent has no borders, and everyone deserves access to meaningful,
              professional work regardless of their location.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We provide a secure, transparent, and efficient marketplace where
              freelancers can thrive and businesses can scale with agility.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Team Collaboration"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hidden md:block">
              <p className="text-indigo-600 font-bold text-xl italic">
                "The best way to predict the future is to create it."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-base-100 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
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
          <div className="card bg-base-100">
            <div className="card-body items-center text-center">
              <h3 className="card-title text-indigo-600">Verified Talent</h3>
              <p className="text-sm text-gray-500">
                Every freelancer on our platform undergoes a rigorous screening
                process to ensure quality.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 border-x border-gray-100 dark:border-gray-800">
            <div className="card-body items-center text-center">
              <h3 className="card-title text-indigo-600">Secure Payments</h3>
              <p className="text-sm text-gray-500">
                Our escrow system ensures that freelancers get paid for their
                hard work and clients get what they pay for.
              </p>
            </div>
          </div>
          <div className="card bg-base-100">
            <div className="card-body items-center text-center">
              <h3 className="card-title text-indigo-600">24/7 Support</h3>
              <p className="text-sm text-gray-500">
                Our dedicated support team is always here to help you navigate
                your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-6 pb-20">
        <div className="bg-indigo-900 rounded-3xl p-10 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to start your journey?
            </h2>
            <p className="mb-10 opacity-80">
              Join thousands of companies and freelancers working together.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="btn btn-primary px-8">Hire Talent</button>
              <button className="btn btn-outline text-white px-8">
                Find a Job
              </button>
            </div>
          </div>
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl opacity-20 -mr-20 -mt-20"></div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
