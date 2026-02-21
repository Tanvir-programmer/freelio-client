import React from "react";
import {
  Sparkles,
  Code,
  PenTool,
  Speaker,
  DollarSign,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const JobCategory = [
  {
    name: "Web Development",
    icon: Code,
    jobCount: "120+ jobs",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    name: "Graphic Design",
    icon: PenTool,
    jobCount: "95+ jobs",
    color: "bg-green-100 text-green-800",
  },
  {
    name: "Digital Marketing",
    icon: Speaker,
    jobCount: "80+ jobs",
    color: "bg-orange-100 text-orange-800",
  },
  {
    name: "Finance & Accounting",
    icon: DollarSign,
    jobCount: "50+ jobs",
    color: "bg-teal-100 text-teal-800",
  },
  {
    name: "AI & Machine Learning",
    icon: Zap,
    jobCount: "45+ jobs",
    color: "bg-purple-100 text-purple-800",
  },
  {
    name: "Content Writing",
    icon: Sparkles,
    jobCount: "150+ jobs",
    color: "bg-pink-100 text-pink-800",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const TopCategories = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Animation */}
        <motion.header
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#f3faf7] text-[#387d61] text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4" />
              Featured Categories
            </div>

            <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">
              Top Job Categories
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Discover high-demand opportunities across various industries and
              skill sets.
            </p>

            <div className="mt-6 w-20 h-1 bg-[#387d61] mx-auto rounded-full"></div>
          </div>
        </motion.header>

        {/* Cards Animation */}
        <motion.main
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {JobCategory.map((category) => {
            const IconComponent = category.icon;

            return (
              <motion.a
                key={category.name}
                href={`/alljobs?category=${encodeURIComponent(category.name)}`}
                variants={cardVariants}
                transition={{ duration: 0.6 }}
                className="block p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 group"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${category.color}`}
                >
                  <IconComponent className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition duration-300">
                  {category.name}
                </h3>

                <p className="text-sm font-medium text-gray-500">
                  {category.jobCount}
                </p>
              </motion.a>
            );
          })}
        </motion.main>
      </div>
    </section>
  );
};

export default TopCategories;
