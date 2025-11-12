import React from "react";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const buttonVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 1.2,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 8px rgba(0,0,0,0.2)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  const backgroundAnimation = {
    initial: { backgroundPosition: "0% 50%" },
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 15,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  return (
    <Motion.div
      className="relative overflow-hidden w-full h-[400px] flex items-center justify-center text-center px-4 rounded-xl my-5"
      initial="initial"
      animate="animate"
      variants={backgroundAnimation}
      style={{
        background: "linear-gradient(270deg, #e0f2f7, #bbdefb, #e3f2fd)", // Soft blue gradient
        backgroundSize: "200% 200%", // For background position animation
      }}
    >
      {/* Overlay for subtle geometric pattern - purely decorative */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239bc7e0' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zm0 30v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 30v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zm0-30V0H4v4H0v2h4v4h2V6h4V4H6zm0 30v-4H4v4H0v2h4v4h2v-4h4v-2H6zm0 30v-4H4v4H0v2h4v4h2v-4h4v-2H6zM36 4v-4h-2v4h-4v2h4v4h2V6h4V4h-4zM6 4v-4H4v4H0v2h4v4h2V6h4V4H6zM36 64v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 64v-4H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "300px 300px",
          animation: "movePattern 60s linear infinite",
        }}
      ></div>
      <style>{`
        @keyframes movePattern {
          from { background-position: 0 0; }
          to { background-position: 300px 300px; }
        }
      `}</style>

      <Motion.div
        className="relative z-10 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Motion.h1
          className="text-5xl font-extrabold text-gray-800 mb-4 tracking-tight leading-tight"
          variants={itemVariants}
        >
          Your Future Starts Here.
        </Motion.h1>
        <Motion.p
          className="text-xl text-gray-600 mb-8"
          variants={itemVariants}
        >
          Discover the perfect job or find the ideal talent for your projects
          with our trusted marketplace.
        </Motion.p>

        <Motion.div
          className="flex justify-center gap-4 flex-col md:flex-row"
          variants={itemVariants}
        >
          <Motion.button
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-600"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/trust" className="block w-full h-full">
              Why Trust Our Platform?
            </Link>{" "}
            {/* Link to your About/Trust page */}
          </Motion.button>
          <Motion.button
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/addjobs" className="block w-full h-full">
              Create a Job
            </Link>{" "}
          </Motion.button>
        </Motion.div>
      </Motion.div>
    </Motion.div>
  );
};

export default Banner;
