import React from "react";
import {
  Sparkles,
  Code,
  PenTool,
  Speaker,
  DollarSign,
  Zap,
} from "lucide-react";

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

const TopCategories = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 border-b-2 border-orange-400 pb-2 inline-flex items-center">
            <Sparkles className="w-6 h-6 text-orange-500 mr-2" />
            Top Job Categories
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Explore opportunities by skill and industry.
          </p>
        </header>

        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {JobCategory.map((category) => {
            const IconComponent = category.icon;

            return (
              <a
                key={category.name}
                href={`/alljobs?category=${encodeURIComponent(category.name)}`}
                className="block p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 group"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${category.color} group-hover:opacity-80 transition duration-300`}
                >
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition duration-300">
                  {category.name}
                </h3>
                <p className="text-sm font-medium text-gray-500">
                  {category.jobCount}
                </p>
              </a>
            );
          })}
        </main>
      </div>
    </section>
  );
};

export default TopCategories;
