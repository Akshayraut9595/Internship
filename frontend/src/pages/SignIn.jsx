import { set } from "mongoose";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const disptach = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   disptach(signInStart());
    //   console.log(formData);
    //   const res = await fetch("http://localhost:8000/api/v1/users/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //     credentials: "include",
    //   },
    // );

    //   if (!res.ok) { // If response status is not in the range 200-299
    //     throw new Error('Enter valid Credentials'); // Throw an error
    //   }

    //   const data = await res.json();
    //   if (data.success === false) {
    //     disptach(signInFailure(data.message));
    //     return;
    //   }
    //   disptach(signInSuccess(data));
    //   navigate('/');
    // } catch (error) {
    //   disptach(signInFailure(error.message));
    // }

    await axios
      .post("/api/v1/users/login", formData, { withCredentials: true })
      .then(async (res) => {
        console.log("res : ", res);
        const data = res.data;
        if (data.success === false) {
          disptach(signInFailure(data.message));
          return;
        }
        disptach(signInSuccess(data));
        navigate("/");
      });
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
        >
          {loading ? "Loading" : "Sign In"}
        </button>
      </form>

      <div className="flex gap-2 mt-5 items-center justify-center">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
    </div>
  );
}

export default SignIn;
