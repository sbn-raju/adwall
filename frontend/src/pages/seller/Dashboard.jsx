import React from 'react'

const SellerDashboard = () => {
  const email = JSON.parse(sessionStorage.getItem('user'))?.user?.userEmail;

  const getUserName = (email) => {
    if (!email) return "Seller";
    return email.split("@")[0]; // Extracting name from email before '@'
  };
  return (
    <div className="w-full h-full mb-7 text-white flex flex-col text-center justify-center p-4 bg-gray-900 rounded-lg shadow-md ">
      <h1 className="text-3xl font-bold">Welcome, {getUserName(email)}! 👋</h1>
      <p className="text-gray-400 mt-2 font-mono">Ready to manage your products and boost your sales?</p>
      <p className="text-gray-400 ">Use the navigation on the left to access all your tools. 🚀</p>
    </div>
  );
}

export default SellerDashboard