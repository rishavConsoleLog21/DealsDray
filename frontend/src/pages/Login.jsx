import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/users/login", {
        email,
        password,
      });
      const { success, message } = res.data;
      if (success) {
        toast.success(message, {
          position: "bottom-left",
        });
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        toast.error(message, {
          position: "bottom-left",
        });
      }
    } catch (error) {
      toast.error("Server Error", {
        position: "bottom-left",
      });
    }
  };

  return (
    <div className="form_container mt-10 max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Login Account</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
        <span className="block text-center text-gray-600">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-500 hover:underline">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
