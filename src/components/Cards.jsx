import React from 'react';
import { FaStar, FaEdit, FaTrash } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import axios from 'axios';

const Cards = ({ home, setInputDiv, data, setUpdatedData, fetchTasks }) => {
    const headers = {
        id: localStorage.getItem("id"),
        Authorization: `Bearer ${localStorage.getItem("token")}`
    };

    const handleCompleteTask = async (id) => {
        try {
            await axios.put(
                `https://task-backend-m2ca.onrender.com/api/v1/task/completed/${id}`,
                {},
                { headers }
            );
            fetchTasks(); // Fetch tasks after marking as complete
        } catch (error) {
            console.log("Error completing task:", error);
        }
        window.location.reload();
        
    };

    const handleImportant = async (id) => {
        try {
            await axios.put(
                `https://task-backend-m2ca.onrender.com/api/v1/task/important/${id}`,
                {},
                { headers }
            );
            fetchTasks(); // Fetch tasks after marking as important
        } catch (error) {
            console.log("Error marking task as important:", error);
        }
        window.location.reload();
    };

    const handleUpdate = (id, title, description) => {
        setInputDiv("fixed");
        setUpdatedData({
            id: id,
            title: title,
            description: description
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://task-backend-m2ca.onrender.com/api/v1/task/deletetask/${id}`, { headers });
            fetchTasks(); // Fetch tasks after deletion
        } catch (error) {
            console.log("Failed to delete task:", error);
        }
        window.location.reload();
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Sort tasks by createdAt in descending order
    const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16 md:mt-4">
            {sortedData.map((item, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4 flex flex-col border border-gray-600">
                    <div className="flex-grow">
                        <h3 className="font-bold text-xl">{item.title}</h3>
                        <p className='text-gray-400 text-sm'>Created at: {formatDate(item.createdAt)}</p>

                        <p className='my-4'>{item.description}</p>
                    </div>
                    <div className="md:flex items-center justify-between mt-9">
                        <button
                            onClick={() => handleCompleteTask(item._id)}
                            className={`text-white px-3 py-[5px] rounded-lg ${item.complete ? 'bg-green-500' : 'bg-orange-500'} w-full md:w-auto`}>
                            {item.complete ? "Completed" : "Incomplete"}
                        </button>
                        <div className="flex space-x-5 md:mt-0 mt-3 justify-around p-2 bg-gray-700 rounded-lg">
                            <button onClick={() => handleImportant(item._id)}>
                                {item.important === false ? (
                                    <FaStar className="cursor-pointer text-xl" title="Favorite" />
                                ) : (
                                    <FaStar className="cursor-pointer text-xl text-yellow-400" title="Favorite" />
                                )}
                            </button>
                            {home !== "false" && 
                             <button onClick={() => handleUpdate(item._id, item.title, item.description)}>
                                 <FaEdit className="cursor-pointer text-xl hover:text-blue-400" title="Edit" />
                             </button>}
                           
                            <button onClick={() => handleDelete(item._id)}>
                                <FaTrash className="text-red-500 cursor-pointer text-xl" title="Delete" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {home === "true" && (
                <button
                    onClick={() => setInputDiv("fixed")}
                    className='border border-gray-500 rounded-lg p-4 hover:bg-gray-800 flex flex-col justify-center items-center hover:scale-105 transition 0.2s'>
                    <IoIosAddCircleOutline className="cursor-pointer text-8xl" title="Add Task" />
                    <h2>Add Task</h2>
                </button>
            )}
        </div>
    );
};

export default Cards;
