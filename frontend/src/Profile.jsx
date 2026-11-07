import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, Mail, Briefcase, Pencil } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details (Replace with your API call)
    const fetchUser = async () => {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    };
    
    fetchUser();
}, []);

if (!user) {
    return <div className="text-center p-10">Loading...</div>;
}

console.log(user.user);
  return (
    <div className="max-w-2xl mx-auto bg-gray-800 shadow-md rounded-lg p-6 text-white">
      {/* Profile Header */}
      <div className="flex flex-col items-center">
        <img src={"https://randomuser.me/api/portraits/men/75.jpg"} alt="User Avatar" className="w-24 h-24 rounded-full border-2 border-gray-300" />
      </div>

      {/* User Details */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="text-white" size={20} />
          <p className="text-white"><strong>Email:</strong> {user?.user?.userEmail}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Briefcase className="text-white" size={20} />
          <p className="text-white"><strong>Role:</strong> {user?.user?.userRole == 'seller' ? "Seller" : "Buyer"}</p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="mt-6 text-center">
        <button 
          className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
          onClick={() => navigate("/dashboard/edit-profile")}
        >
          <Pencil size={16} /> Edit Profile
        </button>
      </div>
    </div>
  );
}
