import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleEmailLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Logged in successfully!");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signInWithGoogle()
      .then(() => {
        toast.success("Signed in with Google!");
        navigate("/");
      })
      .catch((err) => {
        if (err.code !== "auth/popup-closed-by-user") {
          toast.error(err.message);
        }
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border-t-8 border-indigo-600">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 pr-12"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Forgot Password (UI only) */}
            <div className="text-right mt-2">
              <button
                type="button"
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Login
          </button>

          {/* Divider */}
          <div className="divider text-gray-400">OR</div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-3 border border-gray-300 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 shadow-sm"
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google logo"
              className="h-5 mr-2"
            />
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center text-sm mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </form>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default Login;
