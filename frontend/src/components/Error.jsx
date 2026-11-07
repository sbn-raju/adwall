import React from "react";
import { Button, Center, Heading, Stack, Text } from "@chakra-ui/react";
import { Home } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

export default function Error() {
  return (
    <Center minH="100vh" bg="bg" px={4}>
      <Stack gap={4} align="center" textAlign="center">
        <Heading
          as="h1"
          fontSize={{ base: "7xl", md: "9xl" }}
          fontWeight="extrabold"
          lineHeight="1"
          bgGradient="to-r"
          gradientFrom="brand.600"
          gradientTo="brand.300"
          bgClip="text"
        >
          404
        </Heading>
        <Text textStyle="xl" color="fg.muted">
          Oops! The page you're looking for doesn't exist.
        </Text>
        <Button asChild colorPalette="brand" size="lg" mt={2}>
          <RouterLink to="/home">
            <Home /> Go Home
          </RouterLink>
        </Button>
      </Stack>
    </Center>
  );
}
