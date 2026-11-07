import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import toast from "react-hot-toast";
import BASE_URI from "../../utils/base_uri";
import Loader from "../../components/Loader";
import PageHeader from "../../components/common/PageHeader";
import WallCard from "../../components/common/WallCard";
import WallGrid from "../../components/common/WallGrid";
import PaginationBar from "../../components/common/PaginationBar";
import EmptyList from "../../components/common/EmptyList";

const RentedWall = () => {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  const fetchAds = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URI}/product/buyer/rented?page=${currentPage}&limit=${limit}`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();

      if (result.success) {
        setAds(result.data);
        setTotalCount(result.totalCount);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error fetching ads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, [currentPage]);

  return (
    <Box>
      <PageHeader title="Your Rented Walls" description="Walls you're currently renting for your ads." />

      {isLoading ? (
        <Loader />
      ) : ads.length === 0 ? (
        <EmptyList title="You haven't rented any walls yet" />
      ) : (
        <WallGrid>
          {ads.map((ad, index) => (
            <WallCard
              key={ad.id}
              index={index}
              image={ad?.walls?.image_link}
              name={ad?.walls?.name}
              description={ad?.walls?.description}
              price={ad?.walls?.price}
              createdAt={ad?.walls?.created_at}
            />
          ))}
        </WallGrid>
      )}

      <PaginationBar count={totalCount} pageSize={limit} page={currentPage} onPageChange={setCurrentPage} />
    </Box>
  );
};

export default RentedWall;
