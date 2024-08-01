import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const InputData = ({ inputDiv, setInputDiv, updatedData, setUpdatedData, onTaskSaved }) => {
    const [data, setData] = useState({ title: "", description: "" });

    useEffect(() => {
        if (updatedData) {
            setData({ title: updatedData.title || "", description: updatedData.description || "" });
        }
    }, [updatedData]);

    const headers = {
        id: localStorage.getItem("id"),
        Authorization: `Bearer ${localStorage.getItem("token")}`
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.title === "" || data.description === "") {
            alert("All fields are required");
            return;
        }

        try {
            if (updatedData.id) {
                // Update existing task
                await axios.put(`https://task-backend-m2ca.onrender.com/api/v1/task/updatetask/${updatedData.id}`, data, { headers });
            } else {
                // Create new task
                await axios.post(`https://task-backend-m2ca.onrender.com/api/v1/task/createtask`, data, { headers });
            }
            setData({ title: "", description: "" });
            setInputDiv("hidden");
            setUpdatedData({ id: "", title: "", description: "" });
            onTaskSaved(); // Notify AllTasks component to refresh the tasks
        } catch (error) {
            console.error("Failed to save task", error);
        }
    };

    return (
        <>
            <div className={`${inputDiv} fixed top-0  left-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 h-full w-full opacity-50`} />
            <div className={`${inputDiv} fixed top-0 left-0 h-full w-full flex justify-center items-center p-3`}>
                <div className='relative bg-gray-900 h-auto w-[600px] rounded-lg p-8 shadow-lg text-gray-100'>
                    <button onClick={() => {
                        setInputDiv("hidden");
                        setData({ title: "", description: "" });
                        setUpdatedData({ id: "", title: "", description: "" });
                    }} className='absolute top-4 right-4 text-gray-300 hover:text-gray-100'>
                        <FaTimes size={24} />
                    </button>
                    <h2 className='text-3xl font-bold text-center mb-6'>
                        {updatedData.id ? "Update Task" : "Add New Task"}
                    </h2>
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title" className='block text-gray-400 mb-2'>Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className='w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
                                placeholder="Enter task title"
                                value={data.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className='block text-gray-400 mb-2'>Description</label>
                            <textarea
                                id="description"
                                name="description"
                                className='w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
                                rows="5"
                                placeholder="Enter task description"
                                value={data.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className='flex justify-end space-x-4'>
                            <button type="reset" className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md' onClick={() => setInputDiv("hidden")}>Cancel</button>
                            <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md'>
                                {updatedData.id ? "Update" : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default InputData;
