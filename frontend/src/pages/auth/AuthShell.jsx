import React from "react";
import { Box, Card, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { ColorModeButton } from "../../components/ui/color-mode";
import Logo from "../../components/common/Logo";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <Flex minH="100vh" bg="bg">
      {/* Brand panel */}
      <Flex
        display={{ base: "none", md: "flex" }}
        direction="column"
        justify="space-between"
        w="1/2"
        p={12}
        color="white"
        position="relative"
        overflow="hidden"
        bgGradient="to-br"
        gradientFrom="brand.700"
        gradientTo="brand.500"
      >
        <Box position="absolute" inset={0} bgImage="url(/images/HeroImage.jpg)" bgSize="cover" bgPos="center" opacity={0.15} aria-hidden />
        <Image src="/images/AdWall.png" alt="Logo" boxSize={14} rounded="lg" position="relative" />
        <Stack gap={4} position="relative" maxW="md">
          <Heading as="p" fontSize="4xl" lineHeight="1.1" fontWeight="extrabold" letterSpacing="tight">
            Welcome to Our Platform
          </Heading>
          <Text textStyle="lg" opacity={0.9}>
            Join us today! List your walls or book high-visibility ad space in minutes.
          </Text>
        </Stack>
        <Text textStyle="sm" opacity={0.7} position="relative">
          &copy; {new Date().getFullYear()} AdWall
        </Text>
      </Flex>

      {/* Form panel */}
      <Flex direction="column" w={{ base: "full", md: "1/2" }} p={{ base: 4, md: 8 }}>
        <Flex justify="space-between" align="center">
          <Logo />
          <ColorModeButton />
        </Flex>
        <Flex flex="1" align="center" justify="center" py={8}>
          <Card.Root w="full" maxW="md" variant="elevated" bg="bg.panel">
            <Card.Header gap={1}>
              <Heading as="h1" size="2xl" letterSpacing="tight">
                {title}
              </Heading>
              {subtitle && <Text color="fg.muted">{subtitle}</Text>}
            </Card.Header>
            <Card.Body>{children}</Card.Body>
            {footer && (
              <Card.Footer justifyContent="center">
                <Text textStyle="sm" color="fg.muted">
                  {footer}
                </Text>
              </Card.Footer>
            )}
          </Card.Root>
        </Flex>
      </Flex>
    </Flex>
  );
}
