import React, { useState, useEffect } from 'react';
import Cards from '../components/Cards';
import { IoIosAddCircleOutline } from "react-icons/io";
import InputData from '../components/InputData';
import axios from 'axios';
import Loader from './Loader';

const AllTasks = () => {
  const [userData, setUserData] = useState([]);
  const [inputDiv, setInputDiv] = useState("hidden");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    description: ""
  });

  const headers = {
    id:localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`https://task-backend-m2ca.onrender.com/api/v1/task/getalltask`, { headers });
      setUserData(response.data.tasks); // Adjust this if the response structure is different
      console.log("hello from all tasks")
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // setError("Failed to load tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskSaved = () => {
    fetchTasks();
  };

  if (loading) return <div><Loader/></div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <>
      <div className='flex justify-between md:w-auto ml-[-5px] md:ml-auto w-[70vw] bg-gradient-to-r from-gray-700 via-gray-700 to-gray-600 p-1 rounded-full sm:static fixed  items-center '>
        <div className='flex justify-center items-center text-center'>
          <h1 className='text-3xl bg-gradient-to-r from-green-300 p-1 via-yellow-500 to-red-400 inline-block text-transparent bg-clip-text select-none font-bold'>
            TASKMANG
          </h1>
        </div>
        <button onClick={() => setInputDiv("block")} className='flex justify-center items-center text-center'>
          <IoIosAddCircleOutline className="cursor-pointer text-5xl hover:scale-105 transition 0.2s" title="Add" />
        </button>
      </div>
      <Cards home={"true"} setInputDiv={setInputDiv} data={userData} setUpdatedData={setUpdatedData}/>
      <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} updatedData={updatedData} setUpdatedData={setUpdatedData} onTaskSaved={handleTaskSaved}/>
    </>
  );
};

export default AllTasks;
