import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import Admin from "../admin/Admin";
import MainLayout from "../layouts/MainLayout";
import Logout from "../components/Auth/Logout";
import About from "../pages/About";
import PublicLayout from "../layouts/PublicLayout";
import { Navigate } from "react-router-dom";
const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/service",
      element: <PublicLayout />,
    },
    {
      path: "/about-us",
      element: <About />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      /**
       * Configure this path in future. If the application starts abnormal behaviour.
       * By commenting this. The Routes has started working correctly. But We are utilizing directly the wildcard route. So, Any issues araises. Configure this.
       */
      //   path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/*",
          element: <MainLayout />,
        },
        {
          /** If Use is admin then render these routes else navigate back to home page */
          path: "/admin/*",
          element:
            localStorage.getItem("UserRole") === "admin" ? (
              <Admin />
            ) : (
              <Navigate to="/" />
            ),
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
