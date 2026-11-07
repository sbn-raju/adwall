import React from "react";
import { Box, Card, DataList, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import AvailabilityBadge from "./AvailabilityBadge";

/** Detail view of a single wall, used on seller pages. Extra sections go in `children`. */
export default function WallDetailCard({ product, available, children }) {
  return (
    <Card.Root variant="outline" bg="bg.panel" overflow="hidden">
      <Image
        src={product.image_link}
        alt={product.name}
        w="full"
        h={{ base: 56, md: 80 }}
        objectFit="cover"
        bg="bg.muted"
        animationName="fade-in"
        animationDuration="slow"
      />
      <Card.Body gap={6}>
        <Flex justify="space-between" align="start" gap={4} flexWrap="wrap">
          <Stack gap={2} flex="1" minW="60">
            <Heading as="h1" size="2xl" letterSpacing="tight">
              {product.name}
            </Heading>
            <Text color="fg.muted">{product.description}</Text>
          </Stack>
          <Stack gap={2} align={{ base: "start", sm: "end" }}>
            <Text textStyle="2xl" fontWeight="bold" color="brand.fg">
              ₹ {product.price}
            </Text>
            <AvailabilityBadge available={available} />
          </Stack>
        </Flex>

        <DataList.Root orientation="horizontal">
          <DataList.Item>
            <DataList.ItemLabel>Location</DataList.ItemLabel>
            <DataList.ItemValue>{product.location}</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Dimensions</DataList.ItemLabel>
            <DataList.ItemValue>{product.dimension}</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Posted on</DataList.ItemLabel>
            <DataList.ItemValue>{moment(product.created_at).format("DD MMM YYYY")}</DataList.ItemValue>
          </DataList.Item>
        </DataList.Root>

        {children && <Box>{children}</Box>}
      </Card.Body>
    </Card.Root>
  );
}
