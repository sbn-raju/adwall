import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  DataList,
  Grid,
  Heading,
  Image,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import Loader from "./components/Loader";
import BASE_URI from "./utils/base_uri";
import AvailabilityBadge from "./components/common/AvailabilityBadge";
import BackButton from "./components/common/BackButton";

const Payments = () => {
  // States for operations
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [amount, setAmount] = useState(0);
  const [product, setProduct] = useState([]);

  // Getting data from location state
  const location = useLocation();
  const { name, email, phone, address } = location.state || {};
  const { product_id } = useParams();

  // Fetch single product details
  const singleProduct = async () => {
    try {
      const response = await fetch(`${BASE_URI}/product/single?product_id=${product_id}`, {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        setProduct(result?.data[0]);
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create Razorpay order
  const createOrderFunction = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URI}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, amount, phone, address, product_id }),
      });

      const result = await response.json();
      if (result.success) {
        setOrder(result.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Razorpay Payment Options
  const razorpayOptions = {
    key: import.meta.env.VITE_REACT_RAZORPAY_ID,
    amount: order?.amount,
    currency: order?.currency,
    name: "AdWall",
    description: "Renting a Wall for advertising.",
    image: "/images/AdWall.png",
    order_id: order?.id,
    callback_url: import.meta.env.VITE_REACT_RAZORPAY_REDIRECT_URL,
    prefill: {
      name: order?.notes?.name,
      email: order?.notes?.email,
      contact: order?.notes?.phone,
    },
    notes: {
      address: "Razorpay",
    },
    theme: {
      color: "#fe5f11",
    },
  };

  // Open Razorpay Payment Popup
  const openPopup = () => {
    let razorpay = new window.Razorpay(razorpayOptions);
    razorpay.open();
  };

  // Fetch product on component mount
  useEffect(() => {
    singleProduct();
  }, []);

  // Update amount when product data is available
  useEffect(() => {
    setAmount(product?.price ? parseFloat(product.price.split("/")[0]) : 0);
  }, [product]);

  // Create order when amount is set
  useEffect(() => {
    if (amount !== 0) {
      createOrderFunction();
    }
  }, [amount]);

  if (isLoading) {
    return <Loader label="Preparing your order…" />;
  }

  return (
    <Container maxW="6xl" py={{ base: 8, md: 12 }}>
      <BackButton mb={6} />
      <Grid templateColumns={{ base: "1fr", md: "1fr 360px" }} gap={6} alignItems="start">
        {/* Product Details */}
        <Card.Root variant="outline" bg="bg.panel" overflow="hidden">
          <Image src={product.image_link} alt={product.name} w="full" h={{ base: 56, md: 72 }} objectFit="cover" bg="bg.muted" />
          <Card.Body gap={4}>
            <Heading as="h1" size="2xl" letterSpacing="tight">
              {product.name}
            </Heading>
            <Text color="fg.muted" textStyle="lg">
              {product.description}
            </Text>
            <DataList.Root orientation="horizontal">
              <DataList.Item>
                <DataList.ItemLabel>Location</DataList.ItemLabel>
                <DataList.ItemValue>{product.location}</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel>Dimensions</DataList.ItemLabel>
                <DataList.ItemValue>{product.dimension}</DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
          </Card.Body>
        </Card.Root>

        {/* Order summary */}
        <Card.Root variant="outline" bg="bg.panel" position={{ md: "sticky" }} top={{ md: "88px" }}>
          <Card.Header>
            <Heading as="h2" size="lg">
              Order summary
            </Heading>
          </Card.Header>
          <Card.Body gap={4}>
            <Box>
              <AvailabilityBadge available={!!product.is_available} />
            </Box>
            {name && (
              <DataList.Root size="sm">
                <DataList.Item>
                  <DataList.ItemLabel>Billed to</DataList.ItemLabel>
                  <DataList.ItemValue>
                    <Stack gap={0}>
                      <Text>{name}</Text>
                      <Text color="fg.muted">{email}</Text>
                    </Stack>
                  </DataList.ItemValue>
                </DataList.Item>
              </DataList.Root>
            )}
            <Separator />
            <Stack direction="row" justify="space-between" align="baseline">
              <Text color="fg.muted">Total</Text>
              <Text textStyle="2xl" fontWeight="bold">
                ₹ {product.price}
              </Text>
            </Stack>
          </Card.Body>
          <Card.Footer flexDirection="column" gap={3}>
            <Button colorPalette="brand" size="lg" w="full" onClick={openPopup} disabled={!order?.id}>
              <Lock /> Pay Now
            </Button>
            <Text textStyle="xs" color="fg.subtle" textAlign="center">
              Payments are processed securely by Razorpay.
            </Text>
          </Card.Footer>
        </Card.Root>
      </Grid>
    </Container>
  );
};

export default Payments;
