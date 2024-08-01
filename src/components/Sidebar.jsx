import React, { useEffect, useState } from 'react';
import { FaTasks, FaStar, FaCheck, FaTimes, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiUserAdd } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const data = [
    {
      title: "All Tasks",
      icon: <FaTasks className='text-2xl ' />,
      link: "/"
    },
    {
      title: "Important Tasks",
      icon: <FaStar className='text-yellow-400 text-2xl' />,
      link: "/importanttasks"
    },
    {
      title: "Completed Tasks",
      icon: <FaCheck className='text-green-400 text-2xl' />,
      link: "/completedtasks"
    },
    {
      title: "Incomplete Tasks",
      icon: <FaTimes className='text-red-500 text-2xl' />,
      link: "/incompletedtasks"
    }
  ];

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear();
    history("/login");
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`https://task-backend-m2ca.onrender.com/api/v1/task/getalltask`, { headers });
        setUserData(response.data.user);
        console.log(response);
        console.log("hello from sidebar ")
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className=" md:p-4 w-full p-1 rounded-xl flex flex-col transition-all duration-300 text-gray-100 ">
      <div className="flex-grow flex flex-col">
        {/* User Info */}
        {userData && (
          <div className="mb-6 hidden md:block">
            <h1 className='font-mono text-orange-500 text-3xl mb-3 text-center'>{`Welcome`}</h1>
            <h2 className='font-semibold text-2xl text-center'>{userData.name}</h2>
            <h3 className='text-lg text-center'>{userData.email}</h3>
            <hr className='border-gray-500 my-2' />
          </div>
        )}

        {/* Sidebar Items */}
        <div className="space-y-4 flex-grow">
          {data.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ${location.pathname === item.link ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}
            >
              <span className='w-8 h-8 flex items-center justify-center'>{item.icon}</span>
              <span className="ml-3 hidden md:inline">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className='mt-auto'>

      <Link
          to="/login"
          className="flex items-center p-2 mb-4 rounded-lg cursor-pointer transition-colors duration-200 w-full text-left bg-green-600 hover:bg-green-700 text-white justify-center"
        >
          <HiUserAdd  className='w-6 h-6 text-white' />
          <span className="ml-3 hidden md:inline">Add</span>
        </Link>
        <button
          onClick={logout}
          className="flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 w-full text-left bg-red-600 hover:bg-red-700 text-white justify-center"
        >
          <FaSignOutAlt className='w-6 h-6 text-white' />
          <span className="ml-3 hidden md:inline">Logout</span>
        </button>
     

      </div>
    </div>
  );
};

export default Sidebar;

