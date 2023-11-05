import { createBrowserRouter } from "react-router-dom";
import Register from "./Authentication/Register.jsx";
import Login from "./Authentication/Login.jsx";
import NotFound from "./Views/NotFound.jsx";
import Users from "./Views/Users/User.jsx";
import DashboardUser from "./Views/Users/DashboardUser.jsx";
import Guest from "./Components/GuestLayout.jsx";
import DefaultLayout from "./Components/DefaultLayout.jsx";
import LandingPage from "./LandingPage.jsx";
import UserProfile from "./user-profile.jsx";
import { Navigate } from "react-router-dom";
import CMSLayout from "./Components/CMSLayout.jsx";
import UP1 from "./UserProfile.jsx";
import DKU from "./DataKartuUndangan.jsx";
import DesainKU from "./DesainKartuUndangan.jsx";
import DetailKU from "./DetailKartuUndangan.jsx";
import T1 from "./test-bg.jsx";
import Template from "./Views/WedTemplateViewer.jsx"
import IsiDataUndangan from "./Views/Users/IsiDataUndangan.jsx"
import PesanUndangan from "./Views/Users/PesanUndangan.jsx";
import PesananUser from "./Views/Users/Pesanan.jsx";
import Latihan from "./Views/Users/Latihan.jsx";

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
            },
            {
                path: '/cms-user-profile',
                element: <UP1 />
            },
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
    },
    
    {
        path: '/cms-desain-ku',
        element: <DesainKU />
    },
    {
        path: '/cms-detail-ku/:id',
        element: <DetailKU />
    },
    {
        path: '/cms-dku',
        element: <DKU />
    },
    {
        path: '/t1',
        element: <T1 />
    },
    {
        path: '/template',
        element: <Template />
    },
    {
        path: '/isi-data-undangan/:id',
        element : <IsiDataUndangan />
    },
    {
        path: '/pesan-undangan',
        element : <PesanUndangan />
    },
    {
        path: '/pesanan/:id',
        element : <PesananUser />
    },
    {
        path: '/latihan/:id',
        element : <Latihan/>
    }
])

export default router;