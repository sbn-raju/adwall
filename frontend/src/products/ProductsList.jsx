import React, { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import BASE_URI from "../utils/base_uri";
import Loader from "../components/Loader";
import PageHeader from "../components/common/PageHeader";
import WallCard from "../components/common/WallCard";
import WallGrid from "../components/common/WallGrid";
import PaginationBar from "../components/common/PaginationBar";
import EmptyList from "../components/common/EmptyList";

const Product = () => {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  const fetchAds = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URI}/product/list?page=${currentPage}&limit=${limit}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (result.success) {
        setAds(result.data);
        setTotalCount(result.totalCount);
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, [currentPage]);

  return (
    <Container maxW="7xl" py={{ base: 10, md: 14 }}>
      <PageHeader
        eyebrow="Marketplace"
        title="Browse Walls"
        description="Discover high-visibility advertising walls and rent the one that fits your campaign."
      />

      {isLoading ? (
        <Loader />
      ) : ads.length === 0 ? (
        <EmptyList title="No walls listed yet" description="Check back soon — new spaces are added every day." />
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
              to={`/product/${ad.id}`}
              ctaLabel="Rent Now"
            />
          ))}
        </WallGrid>
      )}

      <PaginationBar count={totalCount} pageSize={limit} page={currentPage} onPageChange={setCurrentPage} />
    </Container>
  );
};

export default Product;
