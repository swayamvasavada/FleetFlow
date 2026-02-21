import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import MainDashboardPage from "./pages/MainDashboardPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ForgotPasswordPage from "./pages/ForgotPassword";

const router = createBrowserRouter([
  // Auth routes (NO layout)
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <RegistrationPage />,
  },
    {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },

  // App routes (WITH layout)
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <MainDashboardPage /> }, // "/"
      { path: "dashboard", element: <MainDashboardPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;