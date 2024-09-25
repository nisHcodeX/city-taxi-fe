import UserDashboardLayout from '../../layouts/user/UserDashboardLayout';
import { lazy } from 'react';

const DashboardPage = lazy(() => import('./Dashboard'));
const RidesPage = lazy(() => import('./Rides'));
const ProfilePage = lazy(() => import('./Profile'));

const UserRoutes = {
  path: 'user',
  element: <UserDashboardLayout />,
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

export default UserRoutes;
