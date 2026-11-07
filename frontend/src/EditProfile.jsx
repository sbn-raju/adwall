import React, { useState } from "react";
import { Alert, Box, Button, Card, Field, Input, Stack } from "@chakra-ui/react";
import PageHeader from "./components/common/PageHeader";
import BackButton from "./components/common/BackButton";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    // Call API to update user profile
  };

  return (
    <Box maxW="xl">
      <BackButton mb={4} />
      <PageHeader title="Edit Profile" description="Update your name, email or password." />

      <Alert.Root status="warning" mb={6} rounded="lg">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>In development</Alert.Title>
          <Alert.Description>This edit profile module is in development stage and not fully developed yet.</Alert.Description>
        </Alert.Content>
      </Alert.Root>

      <Card.Root variant="outline" bg="bg.panel">
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <Stack gap={5}>
              <Field.Root>
                <Field.Label>Name</Field.Label>
                <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter new name" autoComplete="name" />
              </Field.Root>

              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter new email" autoComplete="email" />
              </Field.Root>

              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                />
              </Field.Root>

              <Button type="submit" colorPalette="brand" size="lg">
                Save Changes
              </Button>
            </Stack>
          </form>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
