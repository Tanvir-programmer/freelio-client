import React, { useContext } from "react";
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
          <input
            name="password"
            type="password"
            className="input"
            placeholder="Password"
          />

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
