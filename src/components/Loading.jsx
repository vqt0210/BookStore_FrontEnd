import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-16 h-16 border-t-4 border-b-4 border-white rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-white">Loading, please wait...</p>
    </div>

  );
};

export default Loading;