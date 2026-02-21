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
      { path: "/", element: <MainDashboardPage /> },
      { path: "vehicles", element: <VehicleRegistry /> },
      { path: "trips", element: <TripDispatcherPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "maintenance", element: <MaintenanceServiceLogPage /> },
      { path: "expenses", element: <ExpenseLogPage /> },
      { path: "drivers", element: <DriverManagementPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
