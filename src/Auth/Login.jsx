import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { signInUser } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const auth = getAuth();
  // Google Login
  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, googleProvider).then((result) => {
      const user = result.user;
      console.log(user);
      toast.success("Signed in with Google!");
      setTimeout(() => navigate("/"), 1000);
    });
  };
  // Email Password Login

  const handleEmailLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Logged in successfully!");
        setTimeout(() => navigate("/"), 1500);
      })
      .catch((err) => toast.error(err.message));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex justify-center ">
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
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43.02.639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98.755l17.27 17.27M8.614 7.54L5.342 4.269c.81-.37 1.705-.597 2.65-.672a1.012 1.012 0 0 1 .012 0C8.423 3.51 12.36 6.5 17 6.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43-.02.639C20.577 16.49 16.64 19.5 12 19.5c-1.396 0-2.73-.284-3.957-.811L14.71 14.71a3 3 0 1 0-4.243-4.242Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12a10.45 10.45 0 0 0 4.29 2.508l2.97-2.97a3 3 0 0 1-1.012-.464 3 3 0 0 1-1.442-.818Z"
                  />
                </svg>
              )}
            </button>
          </div>

          <div
            className="flex flex-col justify-between
            items-center"
          >
            <p className="text-blue-500 font-light my-3 text-[14px]">
              Did not have Account?{" "}
              <Link className="underline" to="/register">
                Register
              </Link>
            </p>

            <p className="text-blue-500 font-light my-3 text-[14px] underline cursor-pointer">
              Forgot Password
            </p>
          </div>

          <button className="btn btn-neutral mt-4">Login</button>

          <button
            className="btn btn-success my-1 bg-[#f8f8f8] text-black border-1 hover:bg-gray-400"
            onClick={handleGoogleLogin}
          >
            <img
              className="h-[25px]"
              src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
              alt=""
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
