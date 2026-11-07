import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { useNavigate, useParams } from 'react-router-dom'

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone:"",
    address: "",
    city: "",
    zip: "",
    paymentMode: ""
  });
  const navigate = useNavigate();
  const { id } = useParams();



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const address = {
      addressLine : formData.address,
      city: formData.city,
      zip: formData.zip
    }
    // name: "",
    // email: "",
    // phone:"",
    // address: "",
    // city: "",
    // zip: "",
    // paymentMode: ""
    const newFormData = {
      address,
      name: formData.name,
      phone: formData.phone,
      paymentMode: formData.paymentMode,
      email: formData.email,
    }

    console.log(newFormData);

    navigate(`/payment/${id}`, {state: newFormData});
  };


  


  
  const handleBack = (e) =>{
       navigate(-1);
  }

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-4">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 max-w-3xl w-full text-white">
      <div>
        <button onClick={handleBack} className="py-2 px-6 mb-2 bg-orange-400 hover:bg-orange-500 rounded-md">
          Back
        </button>
      </div>
        <h2 className="text-3xl font-bold mb-6 text-center">Billing Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block">Phone No.</label>
            <input
              type="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block">ZIP Code</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-400 text-white p-3 rounded-lg hover:bg-orange-500 transition"
          >
            Complete Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
