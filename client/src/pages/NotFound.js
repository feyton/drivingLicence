import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-700 mb-2">404</h1>
        <p className="text-lg text-gray-500 mb-8">Oops! Page not found.</p>
        <Link
          to="/"
          className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          Go back to home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
