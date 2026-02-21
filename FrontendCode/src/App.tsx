import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import MainDashboardPage from './pages/MainDashboardPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      { path: "dashboard", element: <MainDashboardPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
