import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-green-400">Payment Successful! 🎉</h1>
        <p className="text-gray-300 mt-4 text-lg">
          Thank you for your purchase! Your payment has been received successfully.
        </p>
        <p className="text-gray-400 mt-2">You will receive a confirmation email shortly.</p>

        <div className="mt-6">
          <button
            onClick={() => navigate("/orders")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md shadow-md transition-all duration-200"
          >
            View Orders
          </button>
          <button
            onClick={() => navigate("/home")}
            className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md shadow-md transition-all duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
