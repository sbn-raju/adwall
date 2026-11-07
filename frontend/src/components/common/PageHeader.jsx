import React from "react";
import { Flex, Heading, Stack, Text } from "@chakra-ui/react";

export default function PageHeader({ title, description, eyebrow, actions, align = "start" }) {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align={{ base: align, md: "end" }}
      gap={4}
      mb={8}
      textAlign={align === "center" ? "center" : "start"}
    >
      <Stack gap={2} flex="1" align={align}>
        {eyebrow && (
          <Text textStyle="xs" fontWeight="semibold" letterSpacing="wider" textTransform="uppercase" color="brand.fg">
            {eyebrow}
          </Text>
        )}
        <Heading as="h1" size={{ base: "2xl", md: "3xl" }} fontWeight="bold" letterSpacing="tight">
          {title}
        </Heading>
        {description && (
          <Text color="fg.muted" maxW="2xl">
            {description}
          </Text>
        )}
      </Stack>
      {actions}
    </Flex>
  );
}
