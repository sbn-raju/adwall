import React, { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowRight, MapPin, Store, Megaphone, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Testimonials from "./Testimonials";
import WallCard from "../components/common/WallCard";
import WallGrid from "../components/common/WallGrid";

const steps = [
  {
    icon: Store,
    title: "List your wall",
    text: "Sellers post a wall with photos, dimensions and pricing in a couple of minutes.",
  },
  {
    icon: MapPin,
    title: "Find the right spot",
    text: "Buyers browse high-visibility locations and compare prices side by side.",
  },
  {
    icon: ShieldCheck,
    title: "Rent securely",
    text: "Book and pay online with Razorpay. Track every rental from your dashboard.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [walls] = useState([
    { id: 1, location: "Downtown Billboard", price: "$500/week", image: "/images/HeroImage.jpg" },
    { id: 2, location: "Mall Entrance Display", price: "$350/week", image: "/images/images1.jpg" },
    { id: 3, location: "Highway Digital Board", price: "$700/week", image: "/images/space-1.jpg" },
  ]);

  return (
    <>
      {/* Hero */}
      <Box position="relative" overflow="hidden" borderBottomWidth="1px">
        <Box
          position="absolute"
          inset={0}
          bgGradient="to-br"
          gradientFrom="brand.subtle"
          gradientVia="bg"
          gradientTo="bg"
          aria-hidden
        />
        <Container maxW="7xl" position="relative" py={{ base: 12, md: 20 }}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 10, lg: 16 }} alignItems="center">
            <Stack gap={6} textAlign={{ base: "center", lg: "start" }} align={{ base: "center", lg: "start" }}>
              <Badge colorPalette="brand" variant="surface" size="lg" rounded="full" px={3}>
                <Megaphone /> The ad-space marketplace
              </Badge>
              <Heading as="h1" fontSize={{ base: "4xl", md: "6xl" }} lineHeight="1.05" fontWeight="extrabold" letterSpacing="tight">
                Advertise your brand{" "}
                <Text as="span" color="brand.solid">
                  where people look.
                </Text>
              </Heading>
              <Text textStyle={{ base: "md", md: "lg" }} color="fg.muted" maxW="xl">
                Buy and sell advertising spaces with ease. Find the perfect location to promote your
                business and maximize visibility.
              </Text>
              <HStack gap={3} flexWrap="wrap" justify={{ base: "center", lg: "start" }}>
                <Button size="xl" colorPalette="brand" onClick={() => navigate("/register")}>
                  I'm a Seller
                </Button>
                <Button size="xl" variant="outline" onClick={() => navigate("/register")}>
                  I'm a Buyer
                </Button>
              </HStack>
            </Stack>

            <Box position="relative">
              <Box position="absolute" inset={-4} bg="brand.solid" opacity={0.15} filter="blur(48px)" rounded="full" aria-hidden />
              <Image
                position="relative"
                src="/images/HeroImage.jpg"
                alt="A large advertising billboard in a busy street"
                rounded="2xl"
                shadow="2xl"
                w="full"
                aspectRatio={4 / 3}
                objectFit="cover"
                borderWidth="1px"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <Container maxW="7xl" py={{ base: 14, md: 20 }}>
        <Stack gap={{ base: 16, md: 24 }}>
          {/* How it works */}
          <Box as="section" aria-labelledby="how-heading">
            <Stack gap={2} textAlign="center" mb={10}>
              <Text textStyle="xs" fontWeight="semibold" letterSpacing="wider" textTransform="uppercase" color="brand.fg">
                How it works
              </Text>
              <Heading id="how-heading" as="h2" size="3xl" letterSpacing="tight">
                From blank wall to booked campaign
              </Heading>
            </Stack>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
              {steps.map((step, i) => (
                <Stack key={step.title} gap={3} p={6} rounded="xl" borderWidth="1px" bg="bg.panel">
                  <Flex boxSize={11} rounded="lg" bg="brand.subtle" color="brand.fg" align="center" justify="center">
                    <Icon as={step.icon} boxSize={5} />
                  </Flex>
                  <Text textStyle="xs" color="fg.subtle" fontWeight="semibold">
                    Step {i + 1}
                  </Text>
                  <Heading as="h3" size="md">
                    {step.title}
                  </Heading>
                  <Text color="fg.muted" textStyle="sm">
                    {step.text}
                  </Text>
                </Stack>
              ))}
            </SimpleGrid>
          </Box>

          {/* Featured walls */}
          <Box as="section" aria-labelledby="featured-heading">
            <Flex justify="space-between" align="end" mb={8} gap={4} flexWrap="wrap">
              <Stack gap={2}>
                <Text textStyle="xs" fontWeight="semibold" letterSpacing="wider" textTransform="uppercase" color="brand.fg">
                  Featured
                </Text>
                <Heading id="featured-heading" as="h2" size="3xl" letterSpacing="tight">
                  Featured Walls
                </Heading>
              </Stack>
              <Button variant="ghost" onClick={() => navigate("/products-list")}>
                View all <ArrowRight />
              </Button>
            </Flex>
            <WallGrid>
              {walls.map((wall, index) => (
                <WallCard
                  key={wall.id}
                  index={index}
                  image={wall.image}
                  name={wall.location}
                  price={wall.price.replace("$", "")}
                  to="/products-list"
                  ctaLabel="Rent Now"
                />
              ))}
            </WallGrid>
          </Box>

          <Testimonials />

          {/* CTA */}
          <Box
            as="section"
            rounded="3xl"
            px={{ base: 6, md: 16 }}
            py={{ base: 12, md: 16 }}
            bgGradient="to-r"
            gradientFrom="brand.600"
            gradientTo="brand.400"
            color="white"
            textAlign="center"
          >
            <Stack gap={5} align="center">
              <Heading as="h2" size={{ base: "2xl", md: "4xl" }} letterSpacing="tight">
                Start advertising today.
              </Heading>
              <Text textStyle="lg" opacity={0.9}>
                Find the best spots for your ads.
              </Text>
              <Button size="xl" bg="white" color="brand.700" _hover={{ bg: "whiteAlpha.900" }} onClick={() => navigate("/products-list")}>
                Get Started <ArrowRight />
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
