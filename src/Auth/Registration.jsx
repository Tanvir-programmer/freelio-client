import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { reload } from "firebase/auth"; // ✅ import reload

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
    if (!photoURL) {
      photoURL = "https://i.ibb.co/L8y2w03/default-user.png";
    }
    const password = form.password.value;

    // ✅ Password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must include at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must include at least one lowercase letter.");
      return;
    }

    try {
      const userCredential = await createUser(email, password);
      const firebaseUser = userCredential.user;

      // ✅ Update user profile in Firebase
      await updateUserProfile(name, photoURL);

      // ✅ Reload Firebase user to reflect new data
      await reload(firebaseUser);

      // ✅ Update context with refreshed user data
      setUser({ ...firebaseUser, displayName: name, photoURL });

      toast.success("Registration successful!");
      form.reset();

      // Redirect after short delay
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleRegister = async (e) => {
    e.preventDefault();
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border-t-8 border-indigo-600">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Create Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Full Name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email Address"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo URL (Optional)
            </label>
            <input
              type="url"
              name="photoURL"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Paste image URL here"
            />
          </div>

          {/* Password with Show/Hide */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 pr-10"
              placeholder="Minimum 6 characters, includes upper and lower case"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-10 text-gray-500 hover:text-indigo-600 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Register
          </button>
        </form>

        {/* Google Sign-in */}
        <div className="mt-6">
          <button
            className="w-full flex items-center justify-center py-3 border border-gray-300 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 shadow-sm"
            type="button"
            onClick={handleGoogleRegister}
          >
            <img
              className="h-6 w-6 mr-3"
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google logo"
            />
            Continue With Google
          </button>
        </div>

        {/* Login link */}
        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an Account?{" "}
          <Link
            className="text-indigo-600 font-medium hover:underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>

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
  );
};

export default Registration;
