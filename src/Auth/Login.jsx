import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { _user, setUser, signInUser, signInWithGoogle } =
    useContext(AuthContext);
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
    <div className="flex justify-center">
      <form onSubmit={handleEmailLogin}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mt-4">
          <legend className="fieldset-legend text-center text-lg">Login</legend>

          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            className="input"
            placeholder="Email"
          />

          <label className="label">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="input w-full pr-10"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <p className="text-blue-500 font-light my-3 text-[14px]">
            Did not have Account?{" "}
            <Link className="underline" to="/register">
              Register
            </Link>
          </p>

          <button className="btn btn-neutral mt-4">Login</button>

          <button
            className="btn btn-success my-1 bg-[#f8f8f8] text-black border-1 hover:bg-gray-400"
            onClick={handleGoogleLogin}
          >
            <img
              className="h-[25px]"
              src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
              alt="Google"
            />
            Continue With Google
          </button>

          <ToastContainer />
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
