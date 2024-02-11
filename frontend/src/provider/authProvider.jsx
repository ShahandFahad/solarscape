/**
 * JWT Authentication in React with react-router
 *
 * https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 */

import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Create authentication context
const AuthContext = createContext();

// Create a Authentication Context provider
const AuthProvider = ({ children }) => {
  // Component content goes here
  const [token, setToken_] = useState(localStorage.getItem("token")); // get token from local storage

  //  Set the new token value
  const setToken = (newToken) => {
    setToken_(newToken); // Update token
  };

  /**
   * Set the default authorization header in axios
   * Stores the token value in the local storage using localStorage.setItem()
   *
   * This effect runs whenever the token value changes.
   * If the token exists, it sets the authorization header in axios and localStorage.
   * If the token is null or undefined, it removes the authorization header from axios and localStorage.
   */
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  /**
   * Create the memoized context value using useMemo():
   *
   * The context value includes the token and setToken function.
   * The token value is used as a dependency for memoization.
   */
  const contextValue = useMemo(() => ({ token, setToken }), [token]);

  /**
   * Provide the authentication context to the child components:
   *
   * Wrap the children components with the AuthContext.Provider
   * Pass the contextValue as the value prop of the provider.
   */
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

/**
 * Export the useAuth hook for accessing the authentication context:
 *
 * useAuth is a custom hook that can be used in components to access the authentication context.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * Export the AuthProvider component as the default export:
 *
 * This allows other files to import and use the AuthProvider component as needed.
 */

export default AuthProvider;
