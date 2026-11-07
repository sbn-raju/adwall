import React from "react";
import { Box, Container, Flex, HStack, Link, Separator, Stack, Text } from "@chakra-ui/react";
import Logo from "./common/Logo";

const links = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact Us", href: "mailto:customercare@adwall.com" },
];

const Footer = () => {
  return (
    <Box as="footer" borderTopWidth="1px" bg="bg.subtle" mt={20}>
      <Container maxW="7xl" py={10}>
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap={6}>
          <Stack gap={3} maxW="sm">
            <Logo />
            <Text color="fg.muted" textStyle="sm">
              The marketplace for physical and digital advertising walls. List your space or find the
              perfect spot for your brand.
            </Text>
          </Stack>
          <HStack as="nav" aria-label="Footer" gap={6} flexWrap="wrap" align="start">
            {links.map((link) => (
              <Link key={link.label} href={link.href} color="fg.muted" textStyle="sm" _hover={{ color: "brand.fg" }}>
                {link.label}
              </Link>
            ))}
          </HStack>
        </Flex>
        <Separator my={6} />
        <Text color="fg.subtle" textStyle="xs">
          &copy; {new Date().getFullYear()} Advertisement Wall. All Rights Reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
