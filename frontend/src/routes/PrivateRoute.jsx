import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import { useAuth } from "../hooks/AuthHooks";

const PrivateRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);

  console.log(authState);

  if (!authState.user || !authState.isAuthenticated) {
    // If user is not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  // If user is logged in, render the child components
  return children;
};

export default PrivateRoute;