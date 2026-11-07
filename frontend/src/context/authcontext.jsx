import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


// Create the Auth Context
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const userData = JSON.parse(sessionStorage.getItem('user')) || {
    isAuthenticated: false,
    user: {},
  }
  const [authState, setAuthState] = useState({
    isAuthenticated: userData.isAuthenticated,
    user: userData.user,
  });

  // Login function
  const login = (user) => {
    console.log("Authentication Login", user);
    setAuthState({
      isAuthenticated: true,
      user,
    });
    
  };

  // Logout function
  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
    sessionStorage.removeItem('user');
    sessionStorage.removeItem("userRole");
  };

  // Get Role of the user and save it in the Session Storage.
  sessionStorage.setItem('userRole', authState.user?.userRole);


  //This to store the user details in Session Storage.
  sessionStorage.setItem('user', JSON.stringify(authState));


  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};