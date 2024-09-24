import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import DashboardLayout from "./layouts/UserDashboardLayout";
import UnauthorizedLayout from "./layouts/UnauthorizedLayout";
import LoginPage from "./features/login";
import UserSignInPage from "./features/userSignIn";
import DriverSignInPage from "./features/driverSignIn";

const Error = lazy(() => import("./features/error/Error"));
const Home = lazy(() => import("./features/home/Home"));
const About = lazy(() => import("./features/help/Help"));
const Todo = lazy(() => import("./features/todo/Todo"));
const Counter = lazy(() => import("./features/counter/Counter"));
const Dashboard = lazy(() => import("./features/dashboard/Dashboard"));

export default function AppRoutes() {
  return useRoutes([
    {
      element: <Home />, 
      path:'/'
    },
    {
      element: <LoginPage />, 
      path:'/login'
    },
    {
      element: <UserSignInPage />, 
      path:'/userSignin'
    },
    {
      element: <DriverSignInPage />, 
      path:'/driverSignIn'
    },
    {
      element: <DashboardLayout />,
      children: [
        { path: "userDashboard", element: <Dashboard /> },
        { path: "counter", element: <Counter /> },
        { path: "todo", element: <Todo /> },
        { path: "error", element: <Error /> },
      ],
    },
    {
      element: <DashboardLayout />,
      children: [
        { path: "driverDashboard", element: <Dashboard /> },
        { path: "counter", element: <Counter /> },
        { path: "todo", element: <Todo /> },
        { path: "error", element: <Error /> },
      ],
    },
    {
      element: <UnauthorizedLayout />,
      children: [
        { path: "home", element: <Home /> },
        { path: "about", element: <About /> },
      ],
    },
  ]);
}
