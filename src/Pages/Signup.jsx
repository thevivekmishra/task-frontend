import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === true) {
    navigate('/');
  }

  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://task-backend-m2ca.onrender.com/api/v1/user/signup`, data);
      const { token, userId } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('id', userId);
      dispatch(authActions.login());
      navigate('/');
    } catch (err) {
      console.error("Error signing up:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : "Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 p-2">
      <div className="bg-gray-900 text-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-gray-200 text-xl mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter your name"
              required
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-200 text-xl mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter your email"
              required
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-200 text-xl mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter your password"
              required
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full px-4 py-2 rounded-md">Sign Up</button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?
            <Link to="/login" className="text-blue-500 hover:underline ml-1">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
