import React, { useState } from "react";
import BASE_URI from "../../utils/base_uri";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import { useAuth } from "../../hooks/AuthHooks";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  //This are the email and the password states.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //This are the state of the loading and error 
  const[isLoading, setIsLoading] = useState();
  const[error, setError] = useState();

  //Geting the Login function in the auth state.
  const { login } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(`${BASE_URI}/auth/login`, {
        method: "POST",
        headers:{
          'Content-Type' : 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({email, password})
      })

      const result = await response.json();
      if(result.success){
        setEmail("");
        setPassword("");
        login(result.data);
        toast.success(result.message || "Login is successfull")
        navigate("/home");
      }
    } catch (error) {
      console.log(error.message || error);
      setError(error.message || "Something Went wrong");
    }finally{
      setIsLoading(false);
    }
    
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
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            

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

           
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </form>

          {/* Already have an account */}
          <p className="mt-4 text-sm text-gray-600 text-center">
            Already don't have an account?
            <a href="/register" className="text-blue-500 ml-1">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
