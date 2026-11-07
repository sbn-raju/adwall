import React from "react";
import { SimpleGrid } from "@chakra-ui/react";

export default function WallGrid({ children }) {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6}>
      {children}
    </SimpleGrid>
  );
}
