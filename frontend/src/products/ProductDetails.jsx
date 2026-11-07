import React, { useEffect, useState } from "react";
import { Box, Button, Container, DataList, Grid, Heading, Image, Separator, Stack, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import BASE_URI from "../utils/base_uri";
import Loader from "../components/Loader";
import AvailabilityBadge from "../components/common/AvailabilityBadge";
import BackButton from "../components/common/BackButton";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState([]);

  const { product_id } = useParams();

  //Getting the product id
  const singleProduct = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URI}/product/single?product_id=${product_id}`, {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        setProduct(result?.data[0]);
      } else {
        toast.error("Unexcepted response from server");
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
    <Container maxW="6xl" py={{ base: 8, md: 12 }}>
      <BackButton mb={6} />
      <Grid templateColumns={{ base: "1fr", md: "1.2fr 1fr" }} gap={{ base: 8, md: 12 }} alignItems="start">
        <Image
          src={product.image_link}
          alt={product.name}
          w="full"
          aspectRatio={4 / 3}
          objectFit="cover"
          rounded="2xl"
          borderWidth="1px"
          bg="bg.muted"
          shadow="lg"
        />

        <Stack gap={6}>
          <Stack gap={3}>
            <Box>
              <AvailabilityBadge available={!!product.is_available} />
            </Box>
            <Heading as="h1" size="3xl" letterSpacing="tight">
              {product.name}
            </Heading>
            <Text textStyle="lg" color="fg.muted">
              {product.description}
            </Text>
          </Stack>

          <DataList.Root orientation="horizontal" size="lg">
            <DataList.Item>
              <DataList.ItemLabel>Location</DataList.ItemLabel>
              <DataList.ItemValue>{product.location}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Dimensions</DataList.ItemLabel>
              <DataList.ItemValue>{product.dimension}</DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>

          <Separator />

          <Stack gap={4}>
            <Box>
              <Text textStyle="sm" color="fg.muted">
                Price
              </Text>
              <Text textStyle="3xl" fontWeight="bold" color="brand.fg">
                ₹ {product.price}
              </Text>
            </Box>
            <Button colorPalette="brand" size="xl" w="full" onClick={() => navigate(`/checkout/${product.id}`)}>
              Rent This Wall
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
