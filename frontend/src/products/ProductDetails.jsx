import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URI from "../utils/base_uri";
import Loader from "../components/Loader";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState([]);

  const { product_id } = useParams();
  console.log(product_id);

  //Getting the product id
  const singleProduct = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URI}/product/single?product_id=${product_id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (result.success) {
        setProduct(result?.data[0]);
      } else {
        toast.error(
          "Unexcepted response from server" || `${error?.message || error}`
        );
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    singleProduct();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-12 flex justify-center">
      <div className="bg-gray-800 shadow-lg rounded-lg max-w-5xl w-full flex flex-col md:flex-row">
        {/* Left Container - Product Images */}
        <div className="md:w-1/2 p-6 flex justify-center items-center">
          <img
            src={product.image_link}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Right Container - Product Details */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
          <p className="text-white text-lg mb-4">{product.description}</p>
          <p className="text-white">
            <strong>Location:</strong> {product.location}
          </p>
          <p className="text-white">
            <strong>Dimensions:</strong> {product.dimension}
          </p>
          <p
            className={`w-1/2 text-center mt-1 px-2 py-1 rounded-full font-semibold ${
              !product.is_available
                ? "text-red-600 bg-red-200"
                : "text-green-600 bg-green-200"
            }`}
          >
            {!product.is_available ? "Not Avialable" : "Avialable"}
          </p>
          <p className="text-white font-bold text-2xl mt-4">
            ₹ {product.price}
          </p>
          <button
            className="mt-6 bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-orange-500 transition w-full"
            onClick={() => navigate(`/checkout/${product.id}`)}
          >
            Rent This Wall
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
