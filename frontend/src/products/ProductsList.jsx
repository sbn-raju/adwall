import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BASE_URI from "../utils/base_uri";
import moment from "moment/moment";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;
  const navigate = useNavigate();

  const fetchAds = async () => {
    setIsLoading(true);
  try {
    const response = await fetch(
      `${BASE_URI}/product/list?page=${currentPage}&limit=${limit}`,{
        method:"GET",
        credentials:'include',
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    const result = await response.json();
    console.log(result);

    if (result.success) {
      
      setAds(result.data);
      setTotalCount(result.totalCount);
    }
  } catch (error) {
    console.error("Error fetching ads:", error);
  }finally{
    setIsLoading(false);
  }
};


  useEffect(() => {
    fetchAds();
  }, [currentPage]);

  if(isLoading){
    return (
        <Loader/>
    )
  }

  
  const handleNavigate = (product_id) =>{
      navigate(`/product/${product_id}`)
  }
  

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <motion.div
            key={ad.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={ad.image_link}
              alt={ad.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{ad.name}</h2>
            <p className="text-gray-400">{ad.description}</p>
            <p className="text-yellow-400 font-bold mt-2">₹ {ad.price}</p>
            <p className="text-gray-500 text-sm mt-1">Posted on {moment(ad.created_at).format("DD MMM YYYY")}</p>
            {/* <p className={`w-1/2 text-center mt-1 px-2 py-1 rounded-full font-semibold ${!ad.is_available ? "text-red-600 bg-red-200" : "text-green-600 bg-green-200"}`} >{!ad.is_available ? "Not Avialable": "Avialable" }</p> */}
            <button className="p-2 bg-orange-400 rounded-md mt-4" onClick={() => handleNavigate(ad.id)}>
              Rent Now
            </button>
           
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg mx-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg mx-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
