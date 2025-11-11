import React, { useContext } from "react";
import { Link, useNavigate } from "react-router"; // Left as 'react-router' per your instruction
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../context/AuthContext";

const Registration = () => {
  const navigate = useNavigate();

  // CHANGED: Added user and setUser to the destructuring
  const { createUser, updateUserProfile, signInWithGoogle, _user, setUser } =
    useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    let photoURL = form.photoURL.value;
    if (!photoURL) {
      photoURL = "https://i.ibb.co/L8y2w03/default-user.png";
    }

    const password = form.password.value;

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

    createUser(email, password)
      .then((userCredential) => {
        return updateUserProfile(name, photoURL).then(() => {
          // CHANGED: Call setUser upon successful profile update
          setUser(userCredential.user);
        });
      })
      .then(() => {
        toast.success("Registration successful!");
        form.reset();
        setTimeout(() => navigate("/"), 1500);
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogleRegister = (e) => {
    e.preventDefault();
    signInWithGoogle()
      .then((result) => {
        // CHANGED: Call setUser after Google sign-in
        setUser(result.user);
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
    <div className="w-full flex justify-center mt-4">
      <form onSubmit={handleRegister}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-center text-lg">
            Register
          </legend>
          <label className="label">Name</label>
          <input type="name" name="name" className="input" placeholder="Name" />

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
          />

          <label className="label">Photo URL</label>
          <input
            type="url"
            name="photoURL"
            className="input"
            placeholder="Photo URL"
          />

          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            
          />

          <p className="text-blue-500 font-light my-3 text-[14px]">
            Already have an Account?{" "}
            <Link className="underline" to="/login">
              Login
            </Link>
          </p>

          <button className="btn btn-neutral mt-4">Register</button>

          <button
            className="btn btn-success my-1 bg-[#f8f8f8] text-black border-1 hover:bg-gray-400"
            type="button"
            onClick={handleGoogleRegister}
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

export default Registration;
