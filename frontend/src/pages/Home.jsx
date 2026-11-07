import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Testimonials from "./Testimonials";

const Home = () => {
  const navigate = useNavigate();
  const [walls, setWalls] = useState([
    {
      id: 1,
      location: "Downtown Billboard",
      price: "$500/week",
      image: "/images/HeroImage.jpg",
    },
    {
      id: 2,
      location: "Mall Entrance Display",
      price: "$350/week",
      image: "/images/images1.jpg",
    },
    {
      id: 3,
      location: "Highway Digital Board",
      price: "$700/week",
      image: "/images/space-1.jpg",
    },
  ]);



  return (
    <div className="space-y-10 bg-gray-900 text-white min-h-screen mt-6 p-6">
      {/* Hero Section */}
      <header className="flex flex-col md:flex-row items-center justify-center p-10 bg-gray-800 rounded-lg shadow-lg">
        {/* Logo Section */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <img
            src="/images/HeroImage.jpg"
            alt="AdWall Logo"
            className="w-full h-full border-radius"
          />
        </div>
        {/* Hero Text Section */}
        <div className="w-full md:w-2/3 text-center md:text-left space-y-6 m-10">
          <h1 className="text-5xl font-extrabold">Advertise Your Brand</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Buy and sell advertising spaces with ease. Find the perfect location
            to promote your business and maximize visibility.
          </p>
          <div className="flex justify-center md:justify-start gap-6 mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium shadow-md transition">
              I'm a Seller
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-medium shadow-md transition">
              I'm a Buyer
            </button>
          </div>
        </div>
      </header>

      <section className="p-6">
        <h2 className="text-2xl font-semibold text-center text-white">
          Featured Walls
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {walls.map((wall) => (
            <div
              key={wall.id}
              className="border border-gray-700 rounded-lg p-4 shadow-lg bg-gray-800"
            >
              <img
                src={wall.image}
                alt={wall.location}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-white">{wall.location}</h3>
              <p className="text-gray-400">{wall.price}</p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded mt-2">
                Rent Now
              </button>
            </div>
          ))}
        </div>
      </section>

      <Testimonials/>


      {/* Footer */}
      <footer className="text-center py-6">
        <p className="text-gray-400">
          Start advertising today. Find the best spots for your ads.
        </p>
        <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded" onClick={() => navigate("/products-list")}>
          Get Started
        </button>
      </footer>

    </div>
  );
};

export default Home;
