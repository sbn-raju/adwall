import React, { useEffect, useState } from "react";
import { Avatar, Box, DataList, Heading, HStack, Separator, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import BASE_URI from "../../../utils/base_uri";
import Loader from "../../../components/Loader";
import BackButton from "../../../components/common/BackButton";
import WallDetailCard from "../../../components/common/WallDetailCard";

export default function RentWallDetails() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { product_id } = useParams();

  //Getting the product id
  const singleProduct = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URI}/product/rent-single?product_id=${product_id}`, {
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
    <Box maxW="3xl" mx="auto">
      <BackButton mb={4} />
      <WallDetailCard product={product} available={false}>
        <Separator mb={6} />
        <Stack gap={4}>
          <Heading as="h2" size="md">
            Tenant Details
          </Heading>
          <HStack gap={4} p={4} rounded="lg" bg="bg.subtle" borderWidth="1px">
            <Avatar.Root size="lg">
              <Avatar.Fallback name={product.users?.name} />
            </Avatar.Root>
            <DataList.Root size="sm" gap={2}>
              <DataList.Item>
                <DataList.ItemLabel>Tenant Name</DataList.ItemLabel>
                <DataList.ItemValue>
                  <Text fontWeight="semibold">{product.users?.name}</Text>
                </DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel>Tenant Email</DataList.ItemLabel>
                <DataList.ItemValue>{product.users?.email}</DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
          </HStack>
        </Stack>
      </WallDetailCard>
    </Box>
  );
}
