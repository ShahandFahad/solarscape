/**
 * This component will serve as a wrapper for our authenticated routes,
 * ensuring that only authenticated users can access them.
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

// Define the ProtectedRoute component, which will serve as a wrapper for our authenticated routes
export const ProtectedRoute = () => {
  /**
   * useAuth() returns: {token: null, setToken: ƒ}
   *  1) setToken : newToken => { setToken_(newToken); // Update token }
   * token : 'anytoken stored in local storage'
   *
   * To retrieve this use: Es6 Destructuring
   */
  const { token } = useAuth();

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the public service page
    return <Navigate to="service" />;
  }
  // If authenticated, render the child routes
  return <Outlet />;
};
