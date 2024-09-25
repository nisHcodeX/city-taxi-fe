import DriverDashboardLayout from '../../layouts/driver/DriverDashboardLayout';
import { lazy } from 'react';

const DashboardPage = lazy(() => import('./Dashboard'));
const RidesPage = lazy(() => import('./Rides'));
const ProfilePage = lazy(() => import('./Profile'));

const DriverRoutes = {
  path: 'driver',
  element: <DriverDashboardLayout />,
  children: [
    {
      path: 'dashboard',
      element: <DashboardPage />,
    },
    {
      path: 'rides',
      element: <RidesPage />,
    },
    {
      path: 'profile',
      element: <ProfilePage />,
    },
  ],
};

export default DriverRoutes;
