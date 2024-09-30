import AdminDashboardLayout from '../../layouts/admin/AdminDashboardLayout';
import { lazy } from 'react';
import DriverPage from './Driver';
import CustomerPage from './Customer';
import OperatorPage from './Operator';

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
      path: 'customer',
      element: <CustomerPage />,
    },
    {
      path: 'operator',
      element: <OperatorPage />,
    },
    {
      path: 'driver',
      element: <DriverPage />,
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
