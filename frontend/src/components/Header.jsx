import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
const navigate = useNavigate();

    const user = JSON.parse(sessionStorage.getItem("user"));
    const role = sessionStorage.getItem("userRole");


  return (
    <>
    {/* Navbar */}
    <nav className="flex justify-between items-center py-4 px-6 text-white bg-gray-800 shadow-lg ">
        <h1 className="text-xl font-bold">AdWall</h1>
        <div className="space-x-4">
          <button className="border border-none px-4 py-2 rounded hover:bg-gray-700"
           onClick={() => navigate("/home")}>
            Home
          </button>
          <button
            className="border border-none px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => navigate("/about-us")}
          >
            About
          </button>
          <button className="border border-none px-4 py-2 rounded hover:bg-gray-700">
            Contact
          </button>
          {user.isAuthenticated ? (
            <button
              className="bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded"
              onClick={() => navigate(`/${role}/dashboard`)}
            >
              Account
            </button>
          ) : (
            <button
              className="bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </>
  )
}

export default Header