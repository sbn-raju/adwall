import React from "react";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { CalendarDays } from "lucide-react";
import moment from "moment";
import { Link as RouterLink } from "react-router-dom";
import AvailabilityBadge from "./AvailabilityBadge";

/**
 * Reusable listing card for an advertising wall.
 * - `to` makes the whole card a link, unless `ctaLabel` is given,
 *   in which case only the CTA button navigates.
 * - `available` (boolean) shows an availability badge when defined.
 */
export default function WallCard({
  image,
  name,
  description,
  price,
  createdAt,
  available,
  to,
  ctaLabel,
  index = 0,
}) {
  const wholeCardLink = to && !ctaLabel;
  const Root = wholeCardLink ? LinkBox : Box;

  return (
    <Root
      as="article"
      h="full"
      animationName="fade-in, slide-from-bottom"
      animationDuration="slow"
      animationFillMode="backwards"
      style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
    >
      <Card.Root
        h="full"
        overflow="hidden"
        variant="outline"
        bg="bg.panel"
        transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
        _hover={{ transform: "translateY(-4px)", shadow: "lg", borderColor: "brand.emphasized" }}
      >
        <Box position="relative">
          <AspectRatio ratio={16 / 10}>
            <Image src={image} alt={name} objectFit="cover" bg="bg.muted" />
          </AspectRatio>
          {typeof available === "boolean" && (
            <AvailabilityBadge available={available} position="absolute" top={3} left={3} shadow="sm" />
          )}
        </Box>

        <Card.Body gap={2} p={5}>
          <Card.Title textStyle="lg" lineClamp={1}>
            {wholeCardLink ? (
              <LinkOverlay asChild>
                <RouterLink to={to}>{name}</RouterLink>
              </LinkOverlay>
            ) : (
              name
            )}
          </Card.Title>
          {description && (
            <Card.Description lineClamp={2} color="fg.muted">
              {description}
            </Card.Description>
          )}
        </Card.Body>

        <Card.Footer p={5} pt={0} justifyContent="space-between" alignItems="end" gap={3} flexWrap="wrap">
          <Box>
            <Text textStyle="xl" fontWeight="bold" color="brand.fg">
              ₹ {price}
            </Text>
            {createdAt && (
              <HStack gap={1.5} color="fg.subtle" textStyle="xs" mt={1}>
                <CalendarDays size={12} />
                <Text>Posted {moment(createdAt).format("DD MMM YYYY")}</Text>
              </HStack>
            )}
          </Box>
          {ctaLabel && to && (
            <Button asChild colorPalette="brand" size="sm">
              <RouterLink to={to}>{ctaLabel}</RouterLink>
            </Button>
          )}
        </Card.Footer>
      </Card.Root>
    </Root>
  );
}
