import { createBrowserRouter } from "react-router-dom";
import Register from "./Authentication/Register.jsx";
import Login from "./Authentication/Login.jsx";
import NotFound from "./Views/NotFound.jsx";
import Users from "./Views/Users/User.jsx";
import DashboardUser from "./Views/Users/DashboardUser.jsx";
import Guest from "./Components/GuestLayout.jsx";
import DefaultLayout from "./Components/DefaultLayout.jsx";
import LandingPage from "./LandingPage.jsx";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/users" />
            },
            {
                path: '/dashboard',
                element: <DashboardUser />
            },
            {
                path: '/users',
                element: <Users />
            }
        ]
    },
    {
        path: '/',
        element: <Guest />,
        children: [
            {
                path: '/register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
    {
        path: '/home',
        element: <LandingPage />
    }
])

export default router;