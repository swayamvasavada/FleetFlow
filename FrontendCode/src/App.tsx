import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import MainLayout from './layouts/MainLayout';
import MainDashboardPage from './pages/MainDashboardPage';
import MaintenanceServiceLogPage from './pages/MaintenanceServiceLogPage';
import AnalyticsPage from './pages/AnalyticsPage';
import VehicleRegistry from './pages/VehicleRegistryPage';
import TripDispatcherPage from './pages/TripDispatcherPage';
import ExpenseLogPage from './pages/ExpenseLogPage';
import DriverManagementPage from './pages/DriverManagementPage';
import VerifyEmailPage from "./pages/VerfiyEmailPage";
import ProtectedRoute from "./layouts/AuthLayout";

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
  {
    path: "/user/verify/:token",
    element: <VerifyEmailPage />,
  },

  // App routes (WITH layout)
  // {
    // element: <ProtectedRoute />, // 1. Check Auth first
    // children: [
      {
        path: "/",
        element: <MainLayout />, // 2. Then Wrap in Layout
        children: [
          { index: true, element: <MainDashboardPage /> },
          { path: "vehicles", element: <VehicleRegistry /> },
          { path: "trips", element: <TripDispatcherPage /> },
          { path: "analytics", element: <AnalyticsPage /> },
          { path: "maintenance", element: <MaintenanceServiceLogPage /> },
          { path: "expenses", element: <ExpenseLogPage /> },
          { path: "drivers", element: <DriverManagementPage /> },
        ],
      },
    // ],
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;