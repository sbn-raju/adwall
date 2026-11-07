import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    // Call API to update user profile
  };

  //Navigateing back
  const handleBack = ()=>{
    navigate(-1);
  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <p className="text-red-800 mb-1"><strong>NOTE*: </strong>This edit profile module is in development stage not fully developed.</p>
        <p className="text-yellow-400 mb-1"><strong>INFO*: </strong>Your can press back button inside the form to go back !!</p>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <button onClick={handleBack} className="py-2 px-6 mb-2 bg-orange-400 hover:bg-orange-500 rounded-md">
          Back
        </button>
      </div>
          {/* Change Name */}
          <div>
            <label className="block text-gray-400 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter new name"
              className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Change Email */}
          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter new email"
              className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Change Password */}
          <div>
            <label className="block text-gray-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
