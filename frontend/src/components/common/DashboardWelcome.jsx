import React from "react";
import { Card, Flex, Heading, Icon, LinkBox, LinkOverlay, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const getUserName = (email, fallback) => {
  if (!email) return fallback;
  return email.split("@")[0]; // Extracting name from email before '@'
};

export default function DashboardWelcome({ fallbackName, tagline, actions }) {
  const email = JSON.parse(sessionStorage.getItem("user"))?.user?.userEmail;

  return (
    <Stack gap={8}>
      <Card.Root
        variant="subtle"
        bgGradient="to-br"
        gradientFrom="brand.subtle"
        gradientTo="bg.subtle"
        borderWidth="1px"
        borderColor="brand.muted"
      >
        <Card.Body p={{ base: 6, md: 10 }} gap={3}>
          <Heading as="h1" size={{ base: "2xl", md: "3xl" }} letterSpacing="tight">
            Welcome, {getUserName(email, fallbackName)}! 👋
          </Heading>
          <Text color="fg.muted" textStyle="lg">
            {tagline}
          </Text>
          <Text color="fg.subtle" textStyle="sm">
            Use the navigation to access all your tools. 🚀
          </Text>
        </Card.Body>
      </Card.Root>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
        {actions.map((action) => (
          <LinkBox key={action.to} asChild>
            <Card.Root
              variant="outline"
              bg="bg.panel"
              transition="all 0.2s"
              _hover={{ borderColor: "brand.emphasized", shadow: "md", transform: "translateY(-2px)" }}
            >
              <Card.Body gap={3}>
                <Flex justify="space-between" align="start">
                  <Flex boxSize={10} rounded="lg" bg="brand.subtle" color="brand.fg" align="center" justify="center">
                    <Icon as={action.icon} boxSize={5} />
                  </Flex>
                  <Icon as={ArrowUpRight} color="fg.subtle" boxSize={4} />
                </Flex>
                <Heading as="h2" size="md">
                  <LinkOverlay asChild>
                    <RouterLink to={action.to}>{action.title}</RouterLink>
                  </LinkOverlay>
                </Heading>
                <Text textStyle="sm" color="fg.muted">
                  {action.description}
                </Text>
              </Card.Body>
            </Card.Root>
          </LinkBox>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
