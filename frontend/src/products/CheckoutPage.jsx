import React, { useState } from "react";
import { Button, Card, Container, Field, Heading, Input, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/common/BackButton";

const fields = [
  { name: "name", label: "Full Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone No.", type: "tel", autoComplete: "tel" },
  { name: "address", label: "Address", type: "text", autoComplete: "street-address" },
];

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    paymentMode: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const address = {
      addressLine: formData.address,
      city: formData.city,
      zip: formData.zip,
    };
    const newFormData = {
      address,
      name: formData.name,
      phone: formData.phone,
      paymentMode: formData.paymentMode,
      email: formData.email,
    };

    navigate(`/payment/${id}`, { state: newFormData });
  };

  return (
    <Container maxW="2xl" py={{ base: 8, md: 12 }}>
      <BackButton mb={6} />
      <Card.Root variant="outline" bg="bg.panel">
        <Card.Header gap={1}>
          <Text textStyle="xs" fontWeight="semibold" letterSpacing="wider" textTransform="uppercase" color="brand.fg">
            Step 1 of 2
          </Text>
          <Heading as="h1" size="2xl" letterSpacing="tight">
            Billing Details
          </Heading>
          <Text color="fg.muted">We'll use these details for your invoice and payment.</Text>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <Stack gap={5}>
              {fields.map((f) => (
                <Field.Root key={f.name} required>
                  <Field.Label>
                    {f.label} <Field.RequiredIndicator />
                  </Field.Label>
                  <Input type={f.type} name={f.name} autoComplete={f.autoComplete} value={formData[f.name]} onChange={handleChange} />
                </Field.Root>
              ))}
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                <Field.Root required>
                  <Field.Label>
                    City <Field.RequiredIndicator />
                  </Field.Label>
                  <Input name="city" autoComplete="address-level2" value={formData.city} onChange={handleChange} />
                </Field.Root>
                <Field.Root required>
                  <Field.Label>
                    ZIP Code <Field.RequiredIndicator />
                  </Field.Label>
                  <Input name="zip" autoComplete="postal-code" value={formData.zip} onChange={handleChange} />
                </Field.Root>
              </SimpleGrid>
              <Button type="submit" colorPalette="brand" size="lg" mt={2}>
                Continue to Payment
              </Button>
            </Stack>
          </form>
        </Card.Body>
      </Card.Root>
    </Container>
  );
};

export default CheckoutPage;
