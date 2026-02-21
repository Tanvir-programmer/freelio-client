import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { reload } from "firebase/auth";
import { FaUser, FaEnvelope, FaImage, FaLock } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile, signInWithGoogle, setUser } =
    useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    let photoURL = form.photoURL.value;
    const password = form.password.value;

    if (!photoURL) {
      photoURL = "https://i.ibb.co/L8y2w03/default-user.png";
    }

    // Password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Must include at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Must include at least one lowercase letter.");
      return;
    }

    try {
      const userCredential = await createUser(email, password);
      const firebaseUser = userCredential.user;

      await updateUserProfile(name, photoURL);
      await reload(firebaseUser);

      setUser({ ...firebaseUser, displayName: name, photoURL });

      toast.success("Registration successful 🎉");
      form.reset();
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithGoogle();
      setUser(result.user);
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e6f2ed] via-white to-[#dceee7] px-4 py-5">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-sm text-gray-500 mt-2">
            Join us and start managing your projects
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute top-4 left-4 text-gray-400" />
            <input
              type="text"
              name="name"
              required
              placeholder="Full Name"
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl
              focus:ring-2 focus:ring-[#387d61] focus:border-[#387d61] outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl
              focus:ring-2 focus:ring-[#387d61] focus:border-[#387d61] outline-none"
            />
          </div>

          {/* Photo URL */}
          <div className="relative">
            <FaImage className="absolute top-4 left-4 text-gray-400" />
            <input
              type="url"
              name="photoURL"
              placeholder="Profile Image URL (optional)"
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl
              focus:ring-2 focus:ring-[#387d61] focus:border-[#387d61] outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-4 left-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Create Password"
              className="w-full pl-11 pr-20 py-3 border border-gray-300 rounded-xl
              focus:ring-2 focus:ring-[#387d61] focus:border-[#387d61] outline-none"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-3 right-4 text-sm font-medium text-[#387d61]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#387d61] hover:bg-[#2f684f]
            text-white font-semibold rounded-xl transition duration-300 shadow-md"
          >
            Register
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleRegister}
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

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#387d61] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>

        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Registration;
