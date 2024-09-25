import AdminDashboardLayout from '../../layouts/admin/AdminDashboardLayout';
import { lazy } from 'react';

const DashboardPage = lazy(() => import('./Dashboard'));
const RidesPage = lazy(() => import('./Rides'));
const ProfilePage = lazy(() => import('./Profile'));

const AdminRoutes = {
  path: 'admin',
  element: <AdminDashboardLayout />,
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

export default AdminRoutes;
