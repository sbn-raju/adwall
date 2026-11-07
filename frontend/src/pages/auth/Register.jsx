import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import BASE_URI  from "../../utils/base_uri.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  //Making the state for the Data.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");

  //Making the loading state and error state.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URI}/auth/register`,{
        method: "POST",
        headers:{
          'Content-Type' : "application/json"
        },
        body: JSON.stringify({name, password, email, role})
      });

      if(response.ok){
        const data = await response.json();
        toast.success(data.message || "User Resgister Successfully");
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      }else{
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message || "Something went wrong try again later !!");
    }finally{
      setIsLoading(false);
    }
    console.log("User Registered:", { name, email, password, role });
  };



  if(isLoading){
    return (
      <Loader/>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Left Section - Logo */}
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-blue-500 text-white p-10">
        <img src="/images/AdWall.png" alt="Logo" className="w-32 h-32 mb-4" />
        <h1 className="text-3xl font-bold">Welcome to Our Platform</h1>
        <p className="text-lg mt-2">Join us today!</p>
      </div>

      {/* Right Section - Register Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Role Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700">Register as</label>
              <select
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>

            <div className="m-2">
              <p className="text-red-500">
                {error}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Register
            </button>
          </form>

          {/* Already have an account */}
          <p className="mt-4 text-sm text-gray-600 text-center">
            Already have an account?
            <a href="/login" className="text-blue-500 ml-1">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
