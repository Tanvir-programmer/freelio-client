import React from "react";
import {
  FiShield,
  FiLock,
  FiStar,
  FiUsers,
  FiCheckCircle,
} from "react-icons/fi";

const Trust = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Why Trust <span className="text-[#387d61]">Freelio</span>
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Freelio is built to create secure, transparent, and reliable
          collaborations between clients and professionals — ensuring every
          project is protected from start to finish.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-8 border border-gray-100 dark:border-gray-700">
          <FiShield className="text-[#387d61] text-3xl mb-4" />
          <h3 className="text-xl font-semibold mb-2 dark:text-white">
            Verified Profiles
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Every account undergoes strict verification to ensure authenticity
            and minimize fraudulent activity.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-8 border border-gray-100 dark:border-gray-700">
          <FiLock className="text-[#387d61] text-3xl mb-4" />
          <h3 className="text-xl font-semibold mb-2 dark:text-white">
            Secure Escrow Payments
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Funds are securely held until milestones are approved, protecting
            both clients and freelancers.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-8 border border-gray-100 dark:border-gray-700">
          <FiStar className="text-[#387d61] text-3xl mb-4" />
          <h3 className="text-xl font-semibold mb-2 dark:text-white">
            Transparent Reviews
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Public ratings and detailed feedback help you make confident and
            informed hiring decisions.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-8 border border-gray-100 dark:border-gray-700">
          <FiUsers className="text-[#387d61] text-3xl mb-4" />
          <h3 className="text-xl font-semibold mb-2 dark:text-white">
            Dedicated Support
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Our support team is always ready to resolve disputes and provide
            timely assistance whenever needed.
          </p>
        </div>

        {/* Card 5 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-8 border border-gray-100 dark:border-gray-700">
          <FiCheckCircle className="text-[#387d61] text-3xl mb-4" />
          <h3 className="text-xl font-semibold mb-2 dark:text-white">
            Skill-Based Matching
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Intelligent matching connects clients with professionals whose
            expertise aligns perfectly with project needs.
          </p>
        </div>

        {/* Card 6 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-8 border border-gray-100 dark:border-gray-700">
          <FiShield className="text-[#387d61] text-3xl mb-4" />
          <h3 className="text-xl font-semibold mb-2 dark:text-white">
            Data Privacy & Security
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            We apply industry-standard encryption and strict access controls to
            safeguard your data and project files.
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <h4 className="text-2xl font-semibold dark:text-white mb-4">
          Build with Confidence on{" "}
          <span className="text-[#387d61]">Freelio</span>
        </h4>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Join a trusted professional community committed to quality,
          transparency, and long-term success.
        </p>
      </div>
    </section>
  );
};

export default Trust;
