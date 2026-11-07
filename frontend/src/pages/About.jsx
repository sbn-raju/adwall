import React from "react";
import { Button, Card, Container, Flex, Heading, Icon, List, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Globe, IndianRupee, ImagePlus, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";

const reasons = [
  { icon: Globe, text: "High Visibility Locations" },
  { icon: IndianRupee, text: "Affordable Pricing Plans" },
  { icon: ImagePlus, text: "Customizable Ad Spaces" },
  { icon: Clock, text: "24/7 Exposure" },
];

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <Container maxW="6xl" py={{ base: 12, md: 20 }}>
      <PageHeader
        align="center"
        eyebrow="About us"
        title="Advertising walls, made simple"
        description="Welcome to our platform! We provide premium advertising spaces on digital and physical walls to help businesses grow. Our advertising walls offer high visibility and targeted audience engagement."
      />

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} mt={4}>
        <Card.Root variant="outline" bg="bg.panel">
          <Card.Body gap={6} p={8}>
            <Heading as="h2" size="2xl">
              Why Advertise With Us?
            </Heading>
            <List.Root variant="plain" gap={4}>
              {reasons.map((reason) => (
                <List.Item key={reason.text} alignItems="center" gap={3} textStyle="lg">
                  <Flex boxSize={10} rounded="lg" bg="brand.subtle" color="brand.fg" align="center" justify="center" flexShrink={0}>
                    <Icon as={reason.icon} boxSize={5} />
                  </Flex>
                  {reason.text}
                </List.Item>
              ))}
            </List.Root>
          </Card.Body>
        </Card.Root>

        <Card.Root
          variant="subtle"
          bgGradient="to-br"
          gradientFrom="brand.600"
          gradientTo="brand.400"
          color="white"
        >
          <Card.Body gap={5} p={8} justify="center">
            <Heading as="h2" size="2xl">
              Buy Your Ad Space
            </Heading>
            <Text textStyle="lg" opacity={0.9}>
              Choose your preferred wall and start advertising today with ease.
            </Text>
            <Stack direction="row">
              <Button size="lg" bg="white" color="brand.700" _hover={{ bg: "whiteAlpha.900" }} onClick={() => navigate("/products-list")}>
                Buy a Wall <ArrowRight />
              </Button>
            </Stack>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>
    </Container>
  );
};

export default AboutUs;
