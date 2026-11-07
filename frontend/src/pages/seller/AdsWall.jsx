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

const AdsWall = () => {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  const fetchAds = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URI}/product/seller/walls?page=${currentPage}&limit=${limit}`, {
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
      <PageHeader title="Your Recent Ads" description="All the walls you've listed. Select one to see details." />

      {isLoading ? (
        <Loader />
      ) : ads.length === 0 ? (
        <EmptyList title="You haven't listed any walls yet" />
      ) : (
        <WallGrid>
          {ads.map((ad, index) => (
            <WallCard
              key={ad.id}
              index={index}
              image={ad.image_link}
              name={ad.name}
              description={ad.description}
              price={ad.price}
              createdAt={ad.created_at}
              available={!!ad.is_available}
              to={`/seller/dashboard/walls/details/${ad.id}`}
            />
          ))}
        </WallGrid>
      )}

      <PaginationBar count={totalCount} pageSize={limit} page={currentPage} onPageChange={setCurrentPage} />
    </Box>
  );
};

export default AdsWall;
