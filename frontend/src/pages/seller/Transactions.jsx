import React, { useState, useEffect } from "react";
import BASE_URI from "../../utils/base_uri";
import toast from "react-hot-toast";
import moment from "moment";
import Loader from "../../components/Loader";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const transactionsPerPage = 10;

  const [isLoading, setIsLoading] = useState(false);


  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URI}/order/list?page=${currentPage}&limit=${transactionsPerPage}`, {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        setTransactions(data.data);
        setTotalCount(data.totalCount);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Something went wrong");
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);


  if(isLoading){
    return (
     <Loader/>
    )
  }

  const totalPages = Math.ceil(totalCount / transactionsPerPage);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-white">Transaction History</h2>
       <p className="text-red-500 mb-2"><strong className="text-red-600">Note* : </strong>If your payment is not updated it will get update in sometime. If not udpate to status to success plase contact customercare@adwall.com</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`p-4 shadow-lg rounded-lg bg-gray-600`}
          >
            <h3 className="text-lg text-white"><strong>Transaction Id: </strong>#{transaction?.id}</h3>
            <p className="text-white"><strong>Product Id: </strong> {transaction?.walls?.id}</p>
            <p className="text-white"><strong>Order Id: </strong> {transaction?.razorpay_order_id}</p>

            <p className="text-white"><strong>Amount: $</strong>{transaction?.walls?.price}</p>
            <p className="text-white"><strong>Name: </strong>{transaction?.walls?.name}</p>
            <p className="text-white"><strong>Date: </strong> {moment(transaction?.created_at).format("DD MMM YYYY")}</p>
            <p
              className={`font-semibold ${
                transaction?.payment_status === "completed"
                  ? "text-green-600"
                  : transaction?.payment_status === "pending"
                  ? "text-orange-600"
                  : "text-red-600"
              }`}
            >
              Status: {transaction?.payment_status}
            </p>
          </div>
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
}
