import React from "react";
import { Navigate } from "react-router-dom";

import { pageRoutes } from "./pageRoutes";

import RouteContainer from "../component/RouteComponent/RouteContainer";

import LoginPage from "../pages/auth/LoginPage"
import EventPage from "../pages/event/EventPage";
import EventDetails from "../pages/event/Details/EventDetails";
import ArchivedEvent from "../pages/event/Archived/ArchivedEvent";

import AdsPage from "../pages/ads/AdsPage";

const routes = [
    {
        path: "app",
        element: <RouteContainer />,
        children: [
            { path: pageRoutes.EVENT, element: <EventPage /> },
            { path: pageRoutes.EVENTDETAIL, element: <EventDetails /> },
            { path: pageRoutes.EVENTLIST, element: <ArchivedEvent /> },
            { path: pageRoutes.ADS, element: <AdsPage /> },
        ],
    },
    {
        path: "/",
        children: [
            { path: pageRoutes.LOGIN, element: <LoginPage /> },
            { path: "*", element: <Navigate to="/app/404" /> },
        ],
    },
];

export default routes;
