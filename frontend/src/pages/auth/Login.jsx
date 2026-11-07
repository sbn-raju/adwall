import React, { useState } from "react";
import { Alert, Button, Field, Input, Link, Stack } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import BASE_URI from "../../utils/base_uri";
import { useAuth } from "../../hooks/AuthHooks";
import AuthShell from "./AuthShell";

const LoginPage = () => {
  //This are the email and the password states.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //This are the state of the loading and error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //Geting the Login function in the auth state.
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URI}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (result.success) {
        setEmail("");
        setPassword("");
        login(result.data);
        toast.success(result.message || "Login is successfull");
        navigate("/home");
      }
    } catch (error) {
      console.log(error.message || error);
      setError(error.message || "Something Went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Login"
      subtitle="Welcome back. Sign in to manage your walls."
      footer={
        <>
          Don't have an account?{" "}
          <Link asChild color="brand.fg" fontWeight="semibold">
            <RouterLink to="/register">Register</RouterLink>
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <Stack gap={5}>
          <Field.Root required>
            <Field.Label>
              Email <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="email"
              size="lg"
              placeholder="you@company.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Password <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="password"
              size="lg"
              placeholder="Enter your password"
              autoComplete="current-password"
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

          <Button type="submit" colorPalette="brand" size="lg" loading={isLoading} loadingText="Signing in…">
            Login
          </Button>
        </Stack>
      </form>
    </AuthShell>
  );
};

export default LoginPage;
