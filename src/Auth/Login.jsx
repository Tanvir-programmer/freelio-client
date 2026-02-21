import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Welcome back 👋");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Signed in successfully!");
        navigate("/");
      })
      .catch((err) => {
        if (err.code !== "auth/popup-closed-by-user") {
          toast.error(err.message);
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e6f2ed] via-white to-[#dceee7] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-2">
            Login to continue managing your projects
          </p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
            <input
              name="email"
              type="email"
              required
              placeholder="Email address"
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl 
              focus:ring-2 focus:ring-[#387d61] focus:border-[#387d61] outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-4 left-4 text-gray-400" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              className="w-full pl-11 pr-20 py-3 border border-gray-300 rounded-xl 
              focus:ring-2 focus:ring-[#387d61] focus:border-[#387d61] outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-4 text-sm font-medium text-[#387d61]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-[#387d61] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#387d61] hover:bg-[#2f684f] 
            text-white font-semibold rounded-xl transition duration-300 shadow-md"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 
            border border-gray-300 rounded-xl hover:border-[#387d61] 
            hover:bg-[#f3faf7] transition duration-300"
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google"
              className="h-5"
            />
            Continue with Google
          </button>

          {/* Register */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#387d61] font-medium hover:underline"
            >
              Create account
            </Link>
          </p>
        </form>

        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Login;
