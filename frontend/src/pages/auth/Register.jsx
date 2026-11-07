import React, { useState } from "react";
import { Alert, Button, Field, HStack, Input, Link, RadioCard, Stack } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import BASE_URI from "../../utils/base_uri.js";
import AuthShell from "./AuthShell";

const roles = [
  { value: "buyer", title: "Buyer", description: "Rent walls for your ads" },
  { value: "seller", title: "Seller", description: "List walls you own" },
];

const Register = () => {
  //Making the state for the Data.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");

  //Making the loading state and error state.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URI}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password, email, role }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || "User Resgister Successfully");
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message || "Something went wrong try again later !!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create an account"
      subtitle="It only takes a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link asChild color="brand.fg" fontWeight="semibold">
            <RouterLink to="/login">Login</RouterLink>
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <Stack gap={5}>
          <RadioCard.Root value={role} onValueChange={(e) => setRole(e.value)} colorPalette="brand" size="sm">
            <RadioCard.Label>Register as</RadioCard.Label>
            <HStack align="stretch">
              {roles.map((item) => (
                <RadioCard.Item key={item.value} value={item.value}>
                  <RadioCard.ItemHiddenInput />
                  <RadioCard.ItemControl>
                    <RadioCard.ItemContent>
                      <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                      <RadioCard.ItemDescription>{item.description}</RadioCard.ItemDescription>
                    </RadioCard.ItemContent>
                    <RadioCard.ItemIndicator />
                  </RadioCard.ItemControl>
                </RadioCard.Item>
              ))}
            </HStack>
          </RadioCard.Root>

          <Field.Root required>
            <Field.Label>
              Name <Field.RequiredIndicator />
            </Field.Label>
            <Input size="lg" placeholder="Enter your name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Email <Field.RequiredIndicator />
            </Field.Label>
            <Input type="email" size="lg" placeholder="you@company.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Password <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="password"
              size="lg"
              placeholder="Create a password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field.Root>

          {error && (
            <Alert.Root status="error" size="sm">
              <Alert.Indicator />
              <Alert.Title>{error}</Alert.Title>
            </Alert.Root>
          )}

          <Button type="submit" colorPalette="brand" size="lg" loading={isLoading} loadingText="Creating account…">
            Register
          </Button>
        </Stack>
      </form>
    </AuthShell>
  );
};

export default Register;
