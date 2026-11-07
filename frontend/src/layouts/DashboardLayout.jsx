import React, { useState } from "react";
import {
  Box,
  Button,
  CloseButton,
  Drawer,
  Flex,
  HStack,
  IconButton,
  Portal,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  User,
  LogOut,
  BadgeIndianRupee,
  BadgeCheck,
  History,
  ImagePlus,
  BrickWall,
} from "lucide-react";
import Header from "../components/Header";
import { useAuth } from "../hooks/AuthHooks";

const buyerOptions = [
  { id: 0, icon: <LayoutDashboard />, optionName: "Overview", link: "/buyer/dashboard" },
  { id: 1, icon: <User />, optionName: "Profile", link: "/buyer/dashboard/profile" },
  { id: 2, icon: <BadgeIndianRupee />, optionName: "Transactions", link: "/buyer/dashboard/tansactions" },
  { id: 4, icon: <History />, optionName: "Rented Walls", link: "/buyer/dashboard/rented-walls" },
];

const sellerOptions = [
  { id: 0, icon: <LayoutDashboard />, optionName: "Overview", link: "/seller/dashboard" },
  { id: 1, icon: <User />, optionName: "Profile", link: "/seller/dashboard/profile" },
  { id: 2, icon: <ImagePlus />, optionName: "Post Ad", link: "/seller/dashboard/add/wall" },
  { id: 5, icon: <BrickWall />, optionName: "Walls", link: "/seller/dashboard/walls" },
  { id: 4, icon: <BadgeCheck />, optionName: "Walls on the Rent", link: "/seller/dashboard/rented-walls" },
];

function SidebarNav({ role, onNavigate, onLogout }) {
  const options = role === "seller" ? sellerOptions : buyerOptions;

  return (
    <Stack as="nav" aria-label="Dashboard" gap={1} h="full">
      <Text px={3} pb={2} textStyle="xs" fontWeight="semibold" color="fg.subtle" textTransform="uppercase" letterSpacing="wider">
        {role === "seller" ? "Seller tools" : "Buyer tools"}
      </Text>
      {options.map((option) => (
        <Button
          key={option.id}
          asChild
          variant="ghost"
          justifyContent="start"
          gap={3}
          color="fg.muted"
          _currentPage={{ bg: "brand.subtle", color: "brand.fg", fontWeight: "semibold" }}
        >
          <NavLink to={option.link} end onClick={onNavigate}>
            {option.icon}
            {option.optionName}
          </NavLink>
        </Button>
      ))}
      <Separator my={3} />
      <Button variant="ghost" colorPalette="red" justifyContent="start" gap={3} onClick={onLogout}>
        <LogOut /> Logout
      </Button>
    </Stack>
  );
}

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const role = sessionStorage.getItem("userRole");
  const { logout } = useAuth();

  const handleLogout = () => {
    setIsSidebarOpen(false);
    logout();
  };

  return (
    <Flex direction="column" minH="100vh" bg="bg">
      <Header />

      <Flex flex="1" w="full">
        {/* Desktop sidebar */}
        <Box
          as="aside"
          display={{ base: "none", lg: "block" }}
          w="64"
          flexShrink={0}
          borderEndWidth="1px"
          bg="bg.subtle"
          p={4}
          position="sticky"
          top="65px"
          h="calc(100vh - 65px)"
          overflowY="auto"
        >
          <SidebarNav role={role} onLogout={handleLogout} />
        </Box>

        {/* Mobile drawer */}
        <Drawer.Root open={isSidebarOpen} onOpenChange={(e) => setIsSidebarOpen(e.open)} placement="start">
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content maxW="72">
                <Drawer.Header>
                  <Drawer.Title>Dashboard</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                  <SidebarNav role={role} onNavigate={() => setIsSidebarOpen(false)} onLogout={handleLogout} />
                </Drawer.Body>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>

        <Flex direction="column" flex="1" minW={0}>
          <HStack display={{ base: "flex", lg: "none" }} px={4} py={3} borderBottomWidth="1px" gap={3}>
            <IconButton variant="outline" size="sm" aria-label="Open dashboard menu" onClick={() => setIsSidebarOpen(true)}>
              <Menu />
            </IconButton>
            <Text fontWeight="semibold">Dashboard</Text>
          </HStack>

          <Box as="main" flex="1" p={{ base: 4, md: 8 }} maxW="6xl" w="full" mx="auto">
            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
