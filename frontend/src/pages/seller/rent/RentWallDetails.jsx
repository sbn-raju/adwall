import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URI from "../../../utils/base_uri";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader";
import moment from "moment";

export default function RentWallDetails() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const { product_id } = useParams();
  console.log(product_id);

  //Getting the product id
  const singleProduct = async() =>{
setIsLoading(true);
try {
  const response = await fetch(`${BASE_URI}/product/rent-single?product_id=${product_id}`,{
    method: "GET",
    credentials: "include"
  });

  const result = await response.json();

  if(result.success){
    setProduct(result?.data[0]);
  }else{
    toast.error("Unexcepted response from server" || `${error?.message || error}`);
  }

} catch (error) {
  console.error("Error fetching ads:", error);
}finally{
  setIsLoading(false);
}
    
  }

  useEffect(()=>{
   
    singleProduct();
  },[])

  // Function to handle delete
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this wall?")) {
      console.log("Deleting the wall...");
      // API Call to delete
    }
  };

  // Function to handle retrieve
  const handleRetrieve = () => {
    alert("You can call the buyer and cancel the deal on some compensation.");
  };

  //Navigateing back
  const handleBack = ()=>{
    navigate(-1);
  }


  if(isLoading){
    return (
      <Loader/>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center items-center">
      
      <div className="max-w-2xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
      <div>
        <button onClick={handleBack} className="py-2 px-6 mb-2 bg-orange-400 hover:bg-orange-500 rounded-md">
          Back
        </button>
      </div>
        {/* Product Image & Details */}
        <motion.img
          src={product.image_link}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-400 mt-2">{product.description}</p>
        <p className="text-white font-bold mt-2"><strong className="text-white">Dimensions: </strong>{product.dimension}</p>
        <p className="text-yellow-400 font-bold mt-2">₹ {product.price}</p>
        <p className="text-gray-500 text-sm mt-1">Posted on {moment(product.created_at).format("DD MMM YYYY")}</p>
        <p className={`w-1/3 text-center mt-1 px-2 py-1 rounded-full font-semibold text-red-600 bg-red-200`} >Not Avialable</p>

        <h2 className="text-2xl font-bold mt-4 pt-4 border-t border-t-white"> Location </h2>
        <p className="text-white font-bold mt-2">{product.location}</p>

        <h2 className="text-2xl font-bold mt-4 pt-4 border-t border-t-white"> User Details </h2>
        <p className="text-white  mt-2"><strong>Tentant Name: </strong>{product.users?.name}</p>
        <p className="text-white  mt-2"><strong>Tentant Email: </strong>{product.users?.email}</p>
      </div>
    </div>
  );
}
