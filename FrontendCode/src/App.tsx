import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import MainDashboardPage from './pages/MainDashboardPage';
import MaintenanceServiceLogPage from './pages/MaintenanceServiceLogPage';
import AnalyticsPage from './pages/AnalyticsPage';
import VehicleRegistry from './pages/VehicleRegistryPage';
import TripDispatcherPage from './pages/TripDispatcherPage';
import ExpenseLogPage from './pages/ExpenseLogPage';
import DriverManagementPage from './pages/DriverManagementPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      { path: "dashboard", element: <MainDashboardPage /> },
      { path: "vehicle-registry", element: <VehicleRegistry /> },
      { path: "trip-dispatcher", element: <TripDispatcherPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "mainteinancelog", element: <MaintenanceServiceLogPage /> },
      { path: "expenses-log", element: <ExpenseLogPage /> },
      { path: "driver-management", element: <DriverManagementPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
