import React from "react";
import { Button, Card, Center, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { CircleCheckBig } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <Center minH="70vh" px={4} py={12}>
      <Card.Root maxW="lg" w="full" variant="outline" bg="bg.panel" textAlign="center">
        <Card.Body gap={4} alignItems="center" p={{ base: 6, md: 10 }}>
          <Flex boxSize={16} rounded="full" bg="green.subtle" color="green.fg" align="center" justify="center" animationName="scale-in" animationDuration="slow">
            <CircleCheckBig size={32} />
          </Flex>
          <Heading as="h1" size="2xl">
            Payment Successful!
          </Heading>
          <Text color="fg.muted" textStyle="lg">
            Thank you for your purchase! Your payment has been received successfully.
          </Text>
          <Text color="fg.subtle">You will receive a confirmation email shortly.</Text>
          <HStack gap={3} mt={4} flexWrap="wrap" justify="center">
            <Button colorPalette="brand" onClick={() => navigate("/orders")}>
              View Orders
            </Button>
            <Button variant="outline" onClick={() => navigate("/home")}>
              Back to Home
            </Button>
          </HStack>
        </Card.Body>
      </Card.Root>
    </Center>
  );
};

export default PaymentSuccess;
