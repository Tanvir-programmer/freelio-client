import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { NavLink } from "react-router";

const ContactUs = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#387d61] to-[#2f684f] text-white text-center rounded-b-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Have questions, feedback, or partnership ideas? Our team is here to
          help you.
        </p>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                  focus:ring-2 focus:ring-[#387d61] focus:border-[#387d61] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                  focus:ring-2 focus:ring-[#387d61] focus:border-[#387d61] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                  focus:ring-2 focus:ring-[#387d61] focus:border-[#387d61] outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#387d61] hover:bg-[#2f684f] 
                text-white font-semibold rounded-xl transition duration-300 shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <FiMail className="text-[#387d61] text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-500 text-sm">support@freelio.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <FiPhone className="text-[#387d61] text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-500 text-sm">+880 1234 567 890</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <FiMapPin className="text-[#387d61] text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-gray-500 text-sm">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="bg-[#f3faf7] rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Let’s Build Something Great Together
          </h2>
          <p className="text-gray-600 mb-8">
            Whether you're a business or freelancer, we're excited to connect.
          </p>
          <button className="px-8 py-3 bg-[#387d61] hover:bg-[#2f684f] text-white font-semibold rounded-xl transition">
            <NavLink to="/"> Explore Freelio</NavLink>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
