import React from 'react'

const Footer = () => {
  return (
    <>
    {/* Footer Section */}
    <footer className="w-full bg-gray-800 text-white mt-16 p-6 text-center">
    <p className="text-lg">&copy; {new Date().getFullYear()} Advertisement Wall. All Rights Reserved.</p>
    <div className="flex justify-center space-x-6 mt-4">
      <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
      <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
      <a href="#" className="hover:text-blue-400 transition">Contact Us</a>
    </div>
  </footer>
    </>
  )
}

export default Footer