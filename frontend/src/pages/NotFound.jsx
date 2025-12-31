import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen text-center bg-slate-50">
      <img
        src="404_NotFound.png"
        alt="not found"
        className="w-3/4 max-w-lg mb-6 object-contain"
      />
      <p className="text-xl md:text-4xl font-semibold mb-4 mt-4 text-gray-700">
        404 - Page Not Found
      </p>
      <a
        href="/"
        className="inline-block px-6 py-3 mt-6 font-medium !text-white transition shadow-md bg-purple-600 rounded-2xl hover:bg-purple-700"
      >
        Back to Home Page
      </a>
    </div>
  );
};

export default NotFound;
