import React from 'react';

const Loader = () => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-4 flex flex-col animate-pulse">
          <div className="flex-grow">
            {/* <div className="bg-gray-700 h-24 w-full rounded-lg mb-4"></div> */}
            <div className="bg-gray-700 h-6 w-3/4 rounded mb-2"></div>
            <div className="bg-gray-700 h-4 w-full rounded my-2"></div>
            <div className="bg-gray-700 h-4 w-full rounded my-2"></div>
            <div className="bg-gray-700 h-4 w-full rounded my-2"></div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="bg-gray-700 h-7 w-20 rounded"></div>
            <div className="flex space-x-5">
              <div className="bg-gray-700 h-7 w-7 rounded"></div>
              <div className="bg-gray-700 h-7 w-7 rounded"></div>
              <div className="bg-gray-700 h-7 w-7 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
