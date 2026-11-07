import React from "react";
import { Avatar, Box, Card, Heading, HStack, RatingGroup, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    role: "Marketing Manager",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    review: "This advertising service boosted our business visibility tremendously! Highly recommended!",
  },
  {
    name: "Jane Smith",
    role: "CEO, Brandify",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    review: "Great service and fantastic results. Will definitely use again!",
  },
  {
    name: "Pushpa",
    role: "CEO, RedWood Sindicate",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    rating: 3,
    review: "This advertising service boosted our business visibility tremendously! Highly recommended!",
  },
];

const TestimonialCard = ({ testimonial }) => (
  <Card.Root
    variant="outline"
    bg="bg.panel"
    h="full"
    transition="transform 0.2s ease, box-shadow 0.2s ease"
    _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
  >
    <Card.Body gap={5}>
      <Box color="brand.solid">
        <Quote size={28} />
      </Box>
      <Text textStyle="md" flex="1">
        “{testimonial.review}”
      </Text>
      <RatingGroup.Root readOnly count={5} value={testimonial.rating} size="sm" colorPalette="yellow" aria-label={`Rated ${testimonial.rating} out of 5`}>
        <RatingGroup.HiddenInput />
        <RatingGroup.Control />
      </RatingGroup.Root>
    </Card.Body>
    <Card.Footer>
      <HStack gap={3}>
        <Avatar.Root size="md">
          <Avatar.Fallback name={testimonial.name} />
          {testimonial.image && <Avatar.Image src={testimonial.image} alt="" />}
        </Avatar.Root>
        <Stack gap={0}>
          <Text fontWeight="semibold">{testimonial.name}</Text>
          <Text textStyle="sm" color="fg.muted">
            {testimonial.role}
          </Text>
        </Stack>
      </HStack>
    </Card.Footer>
  </Card.Root>
);

export default function Testimonials() {
  return (
    <Box as="section" aria-labelledby="testimonials-heading">
      <Stack gap={2} textAlign="center" mb={10}>
        <Text textStyle="xs" fontWeight="semibold" letterSpacing="wider" textTransform="uppercase" color="brand.fg">
          Testimonials
        </Text>
        <Heading id="testimonials-heading" as="h2" size="3xl" letterSpacing="tight">
          Loved by advertisers
        </Heading>
      </Stack>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
