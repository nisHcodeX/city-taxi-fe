import OperatorDashboardLayout from '../../layouts/operator/OperatorDashboardLayout';
import { lazy } from 'react';

const DashboardPage = lazy(() => import('./Dashboard'));
const RidesPage = lazy(() => import('./Rides'));
const ProfilePage = lazy(() => import('./Profile'));

const OperatorRoutes = {
  path: 'operator',
  element: <OperatorDashboardLayout />,
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

export default OperatorRoutes;
