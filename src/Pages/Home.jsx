import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../index.css'

const Home = () => {
  return (
    <div className='flex h-full gap-4 p-3'>
      <div className='h-[97vh] w-1/6 border rounded-xl border-gray-500 shadow-sm flex justify-between'>
        <Sidebar />
      </div>
      <div className='h-[97vh] w-5/6 border rounded-xl border-gray-500 shadow-sm p-4 overflow-y-auto custom-scrollbar'>
       <Outlet />    {/*to show component right side now change app.jsx */}
      </div>
    </div>
  );
};

export default Home;
