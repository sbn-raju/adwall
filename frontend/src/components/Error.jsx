import React from "react";

export default function Error() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900  text-white">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl mt-4">Oops! The page you're looking for doesn't exist.</p>
        <a
          href="/home"
          className="mt-6 px-6 py-3 bg-orange-400 text-white rounded-lg shadow-md hover:bg-orange-500 transition"
        >
          Go Home
        </a>
      </div>
    );
  }
  