import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import Admin from "../admin/Admin";
import MainLayout from "../layouts/MainLayout";
import Logout from "../components/Auth/Logout";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  //  TODO: Configure these pages for general public.
  const routesForPublic = [
    {
      path: "/service",
      element: (
        <div>
          Service Page: Available to General Public, Requires no login or
          signup.
        </div>
      ),
    },
    {
      path: "/about-us",
      element: (
        <div>
          About Us: Available to General Public, Requires no login or signup.
        </div>
      ),
    },
  ];

  //  TODO: Implement a Differnt Strategy for ADMIN.
  //  TODO: When Want to access. Ask for login. Check user role in backend.
  //  TODO: IF role is admin then allow, to restricted routes. ELSE Donot login

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
          path: "/admin/*",
          element: <Admin />,
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
