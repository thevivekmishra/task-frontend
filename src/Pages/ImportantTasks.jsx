import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import axios from 'axios';
import { AiOutlineWarning } from 'react-icons/ai'; 
import Loader from './Loader';

const ImportantTasks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`https://task-backend-m2ca.onrender.com/api/v1/task/importanttask`, { headers });
        setData(response.data.tasks); // Adjust this if the response structure is different
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        // setError("Failed to load tasks.");
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div className="flex flex-col items-center justify-center h-full">
  <div className="text-2xl font-semibold text-gray-300 mb-4">Loading your tasks...</div>
  <div className="flex items-center space-x-2">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      <span className="text-lg text-gray-400">Please wait a moment</span>
  </div>
</div>

  if (error) return <div className="text-center py-4">{error}</div>;

  return (
    <>
        <h1 className='flex items-center justify-center bg-gray-700 p-3 text-xl rounded-lg md:mb-0 mb-[-30px]'>Important Tasks</h1>
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center text-gray-500">
          <AiOutlineWarning className="text-6xl mb-4" />
          <div className="text-xl font-semibold">No important tasks available</div>
        </div>
      ) : (
        <Cards home={"false"} data={data} />
      )}
    </>
  );
}

export default ImportantTasks;
