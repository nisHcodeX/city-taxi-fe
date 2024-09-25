import AdminRoutes from './features/admin/Routes';
import DriverRoutes from './features/driver/Routes';
import OperatorRoutes from './features/operator/Routes';
import UserRoutes from './features/user/Routes';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import DriverSignInPage from './features/driverSignIn';
import LoginPage from './features/login';
import UserSignInPage from './features/userSignIn';
import UnauthorizedLayout from './layouts/UnauthorizedLayout';

const Home = lazy(() => import('./features/home/Home'));
const About = lazy(() => import('./features/help/Help'));

export default function AppRoutes() {
  return useRoutes([
    {
      element: <Home />,
      path: '/',
    },
    {
      element: <LoginPage />,
      path: '/login',
    },
    {
      element: <UserSignInPage />,
      path: '/userSignin',
    },
    {
      element: <DriverSignInPage />,
      path: '/driverSignIn',
    },
    UserRoutes,
    DriverRoutes,
    AdminRoutes,
    OperatorRoutes,
    {
      element: <UnauthorizedLayout />,
      children: [
        { path: 'home', element: <Home /> },
        { path: 'about', element: <About /> },
      ],
    },
  ]);
}
