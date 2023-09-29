import { createBrowserRouter } from "react-router-dom";
import Register from "./Authentication/Register.jsx";
import Login from "./Authentication/Login.jsx";

const router = createBrowserRouter([
    {
        path: 'register',
        element: <Register />
    },
    {
        path: 'login',
        element: <Login />
    },
])

export default router;