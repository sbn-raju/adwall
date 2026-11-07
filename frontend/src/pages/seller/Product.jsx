import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URI from "../../utils/base_uri";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import moment from "moment";

export default function ProductSellerDetails() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const { product_id } = useParams();
  console.log(product_id);

  //Getting the product id
  const singleProduct = async() =>{
setIsLoading(true);
try {
  const response = await fetch(`${BASE_URI}/product/single?product_id=${product_id}`,{
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
        <p className={`w-1/4 text-center mt-1 px-2 py-1 rounded-full font-semibold ${!product.is_available ? "text-red-600 bg-red-200" : "text-green-600 bg-green-200"}`} >{!product.is_available ? "Not Avialable": "Avialable" }</p>

        <h2 className="text-2xl font-bold mt-4 pt-4 border-t border-t-white"> Location </h2>
        <p className="text-white font-bold mt-2">{product.location}</p>

        {/* Danger Zone */}
        <div className="mt-6 p-4 border border-red-500 bg-red-800/20 rounded-lg">
          <h2 className="text-red-400 text-xl font-semibold mb-3">
            Danger Zone ⚠️
          </h2>

          {/* Delete Section */}
          <div className="flex justify-between items-center border-b border-red-500 pb-4 mb-4">
            <p className="text-gray-400 text-sm max-w-md">
              Deleting this wall will permanently remove it from the database.
              This action **CANNOT** be undone.
            </p>
            <motion.button
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold shadow-lg"
              onClick={handleDelete}
              whileTap={{ scale: 0.95 }}
            >
              Delete Wall
            </motion.button>
          </div>

          {/* Retrieve Section */}
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-sm max-w-md">
              If you want to cancel the deal, you can **contact the buyer** and
              negotiate a cancellation with possible compensations.
            </p>
            <motion.button
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md font-semibold shadow-lg"
              onClick={handleRetrieve}
              whileTap={{ scale: 0.95 }}
            >
              Retrieve Wall
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
