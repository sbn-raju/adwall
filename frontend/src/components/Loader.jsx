import React from "react";
import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

const Loader = ({ label = "Loading…" }) => {
  return (
    <Center minH="60vh" w="full">
      <VStack gap={3}>
        <Spinner size="xl" color="brand.solid" borderWidth="3px" />
        <Text color="fg.muted" textStyle="sm">
          {label}
        </Text>
      </VStack>
    </Center>
  );
};

export default Loader;
