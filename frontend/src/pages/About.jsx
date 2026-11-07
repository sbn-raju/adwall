import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <div className="max-w-4xl text-center mt-3">
        <h1 className="text-5xl font-extrabold text-white mb-6">About Us</h1>
        <p className="text-white text-lg mb-8 leading-relaxed">
          Welcome to our platform! We provide premium advertising spaces on digital and physical walls to help businesses grow. Our advertising walls offer high visibility and targeted audience engagement.
        </p>
      </div>
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 mt-10">
        <div className="bg-gray-800 shadow-xl rounded-2xl p-8 flex flex-col items-center border">
          <h2 className="text-3xl font-semibold text-white mb-4">Why Advertise With Us?</h2>
          <ul className="text-white list-disc list-inside space-y-2 text-lg">
            <li>🌍 High Visibility Locations</li>
            <li>💰 Affordable Pricing Plans</li>
            <li>🖼️ Customizable Ad Spaces</li>
            <li>⏳ 24/7 Exposure</li>
          </ul>
        </div>
        <div className="bg-gray-800 shadow-xl rounded-2xl p-8 flex flex-col items-center border ">
          <h2 className="text-3xl font-semibold text-white mb-4">Buy Your Ad Space</h2>
          <p className="text-white mb-6 text-lg text-center">
            Choose your preferred wall and start advertising today with ease.
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl shadow-lg text-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105">Buy a Wall</button>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
