import React, { useEffect, useState } from "react";
import { Avatar, Badge, Box, Button, Card, DataList, Heading, HStack, Stack } from "@chakra-ui/react";
import { Mail, Briefcase, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "./components/Loader";
import PageHeader from "./components/common/PageHeader";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details (Replace with your API call)
    const fetchUser = async () => {
      setUser(JSON.parse(sessionStorage.getItem("user")));
    };

    fetchUser();
  }, []);

  if (!user) {
    return <Loader />;
  }

  const email = user?.user?.userEmail;
  const roleLabel = user?.user?.userRole == "seller" ? "Seller" : "Buyer";

  return (
    <Box maxW="2xl">
      <PageHeader title="Profile" description="Your account details." />
      <Card.Root variant="outline" bg="bg.panel" overflow="hidden">
        <Box h={24} bgGradient="to-r" gradientFrom="brand.600" gradientTo="brand.300" />
        <Card.Body gap={6} mt={-12}>
          <HStack justify="space-between" align="end" flexWrap="wrap" gap={4}>
            <Stack gap={3}>
              <Avatar.Root size="2xl" css={{ outlineWidth: "4px", outlineColor: "var(--chakra-colors-bg-panel)", outlineStyle: "solid" }}>
                <Avatar.Fallback name={email?.split("@")[0]} />
              </Avatar.Root>
              <Stack gap={1}>
                <Heading as="h2" size="xl">
                  {email?.split("@")[0]}
                </Heading>
                <Box>
                  <Badge colorPalette="brand" variant="subtle">
                    {roleLabel}
                  </Badge>
                </Box>
              </Stack>
            </Stack>
            <Button variant="outline" onClick={() => navigate("/dashboard/edit-profile")}>
              <Pencil /> Edit Profile
            </Button>
          </HStack>

          <DataList.Root orientation="horizontal" size="lg">
            <DataList.Item>
              <DataList.ItemLabel>
                <HStack gap={2}>
                  <Mail size={16} /> Email
                </HStack>
              </DataList.ItemLabel>
              <DataList.ItemValue>{email}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>
                <HStack gap={2}>
                  <Briefcase size={16} /> Role
                </HStack>
              </DataList.ItemLabel>
              <DataList.ItemValue>{roleLabel}</DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
