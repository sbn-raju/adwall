import React from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  IconButton,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { Menu as MenuIcon, UserRound, LogIn } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthHooks";
import { ColorModeButton } from "./ui/color-mode";
import Logo from "./common/Logo";

const navItems = [
  { label: "Home", to: "/home" },
  { label: "Browse Walls", to: "/products-list" },
  { label: "About", to: "/about-us" },
];

const CONTACT_HREF = "mailto:customercare@adwall.com";

const Header = () => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const role = sessionStorage.getItem("userRole");

  const accountAction = authState?.isAuthenticated
    ? { label: "Account", icon: <UserRound />, onClick: () => navigate(`/${role}/dashboard`) }
    : { label: "Login", icon: <LogIn />, onClick: () => navigate("/login") };

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      bg="bg/80"
      backdropFilter="saturate(180%) blur(12px)"
      borderBottomWidth="1px"
    >
      <Container maxW="7xl" py={3}>
        <HStack as="nav" aria-label="Main" justify="space-between" gap={4}>
          <Logo />

          <HStack gap={1} display={{ base: "none", md: "flex" }}>
            {navItems.map((item) => (
              <Button key={item.to} asChild variant="ghost" size="sm" color="fg.muted" _currentPage={{ color: "fg", bg: "bg.muted" }}>
                <NavLink to={item.to}>{item.label}</NavLink>
              </Button>
            ))}
            <Button asChild variant="ghost" size="sm" color="fg.muted">
              <a href={CONTACT_HREF}>Contact</a>
            </Button>
          </HStack>

          <HStack gap={2}>
            <ColorModeButton />
            <Button colorPalette="brand" size="sm" onClick={accountAction.onClick}>
              {accountAction.icon}
              {accountAction.label}
            </Button>

            <Menu.Root>
              <Menu.Trigger asChild>
                <IconButton variant="outline" size="sm" aria-label="Open navigation" display={{ base: "inline-flex", md: "none" }}>
                  <MenuIcon />
                </IconButton>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content minW="44">
                    {navItems.map((item) => (
                      <Menu.Item key={item.to} value={item.to} asChild>
                        <NavLink to={item.to}>{item.label}</NavLink>
                      </Menu.Item>
                    ))}
                    <Menu.Item value="contact" asChild>
                      <a href={CONTACT_HREF}>Contact</a>
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
