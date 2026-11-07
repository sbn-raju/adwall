import React from "react";
import { HStack, Image, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Logo({ to = "/home", size = 8 }) {
  return (
    <HStack asChild gap={2.5} _hover={{ textDecoration: "none" }}>
      <RouterLink to={to} aria-label="AdWall home">
        <Image src="/images/AdWall.png" alt="" boxSize={size} rounded="md" />
        <Text fontWeight="extrabold" textStyle="lg" letterSpacing="tight">
          Ad<Text as="span" color="brand.solid">Wall</Text>
        </Text>
      </RouterLink>
    </HStack>
  );
}
