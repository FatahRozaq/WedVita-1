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
import Template1 from "./assets/WedTemplate/template_1.jsx";
import InvitationDesignsList from "./invitationDesignsList.jsx";

import LeafletMain from "./coba_Leaflet_Main.jsx";
import LeafletMap from './coba_LeafletMap.jsx';
import MapLinks from './coba_MapLinks.jsx';

import WeddingTemplateLeaflet from "./assets/WedTemplate/template_leaflet_1.jsx";

import WeddingTemplateLeaflet2 from "./assets/WedTemplate/template_leaflet_2_parallax.jsx";
import ParallaxProvider from "./assets/WedTemplate/parallax_provider_2.jsx";
import ParallaxComponent from "./assets/WedTemplate/parallax_component_2.jsx";

import ImgKaveh1 from "./assets/WedTemplate/ImgKaveh1.jsx";
import ParallaxDrivers from "./assets/WedTemplate/parallax_driver.jsx";
import ParallaxSpringCoba from "./assets/WedTemplate/ParallaxSpringCoba.jsx";

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
        path: '/template1/:id',          // langkah 1
        element: <Template1/>
    },
    {
        path: '/leafletMap',
        element: <LeafletMap/>       
    },
    {
        path: '/previewUndangan/:id',
        element: <WeddingTemplateLeaflet2/>
    },
    {
        path: '/Wedding/:namaVariable/:id',
        element: <ParallaxSpringCoba/>       
    },
    {
        path: '/cobaParallax',
        element: <ParallaxDrivers/>  
    },
    { 
        path: '/cobaLeaflet',
        element: <LeafletMain/>       
    },
    { 
        path: '/parSpring',
        element: <ParallaxSpringCoba/>       
    },
    {
        path: '/invitationDesignsList',
        element: <InvitationDesignsList/>
    }
])

export default router;