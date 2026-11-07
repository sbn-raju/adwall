import React, { useEffect, useState } from "react";
import Loader from "./components/Loader";
import BASE_URI from "./utils/base_uri";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Payments = () => {
  // States for operations
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [amount, setAmount] = useState(0);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  // Getting data from location state
  const location = useLocation();
  const { name, email, phone, address } = location.state || {};
  const { product_id } = useParams();

  // Fetch single product details
  const singleProduct = async () => {
    try {
      const response = await fetch(`${BASE_URI}/product/single?product_id=${product_id}`, {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        setProduct(result?.data[0]);
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create Razorpay order
  const createOrderFunction = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URI}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, amount, phone, address, product_id }),
      });

      const result = await response.json();
      if (result.success) {
        setOrder(result.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Razorpay Payment Options
  const razorpayOptions = {
    key: import.meta.env.VITE_REACT_RAZORPAY_ID,
    amount: order?.amount,
    currency: order?.currency,
    name: "AdWall",
    description: "Renting a Wall for advertising.",
    image: "/images/AdWall.png",
    order_id: order?.id,
    callback_url: import.meta.env.VITE_REACT_RAZORPAY_REDIRECT_URL,
    prefill: {
      name: order?.notes?.name,
      email: order?.notes?.email,
      contact: order?.notes?.phone,
    },
    notes: {
      address: "Razorpay",
    },
    theme: {
      color: "#3399cc",
    },
  };

  // Open Razorpay Payment Popup
  const openPopup = () => {
    let razorpay = new window.Razorpay(razorpayOptions);
    razorpay.open();
  };

  // Fetch product on component mount
  useEffect(() => {
    singleProduct();
  }, []);

  // Update amount when product data is available
  useEffect(() => {
    setAmount(product?.price ? parseFloat(product.price.split("/")[0]) : 0);
  }, [product]);

  // Create order when amount is set
  useEffect(() => {
    if (amount !== 0) {
      createOrderFunction();
    }
  }, [amount]);


  const handleBack = (e) =>{
    navigate(-1);
}

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex flex-col md:flex-row items-center justify-center p-6">
      {/* Left Container - Product Details */}
      
      <div className="bg-gray-800 shadow-lg rounded-lg max-w-3xl w-full p-6 text-white md:w-2/3">
      <div>
        <button onClick={handleBack} className="py-2 px-6 mb-2 bg-orange-400 hover:bg-orange-500 rounded-md">
          Back
        </button>
      </div>
        
        <img
          src={product.image_link}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg mt-4"
        />
        <h1 className="text-3xl font-bold mb-3 mt-3">{product.name}</h1>
        <p className="text-lg mb-2">{product.description}</p>
        <p>
          <strong>Location:</strong> {product.location}
        </p>
        <p>
          <strong>Dimensions:</strong> {product.dimension}
        </p>
      </div>

      {/* Right Container - Availability & Payment */}
      <div className="bg-gray-800 shadow-lg rounded-lg max-w-sm w-full p-6 mt-6 md:mt-0 md:ml-6 text-white flex flex-col justify-center items-center">
        <p
          className={`w-1/2 text-center px-2 py-1 rounded-full font-semibold ${
            !product.is_available
              ? "text-red-600 bg-red-200"
              : "text-green-600 bg-green-200"
          }`}
        >
          {!product.is_available ? "Not Available" : "Available"}
        </p>

        <p className="text-2xl font-bold mt-4">₹ {product.price}</p>

        <button
          onClick={openPopup}
          className="mt-6 bg-amber-500 px-6 py-3 text-lg font-bold rounded-lg hover:bg-amber-600 transition duration-300"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payments;
