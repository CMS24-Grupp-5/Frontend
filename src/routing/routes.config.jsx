import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthLayout from "../partials/layouts/AuthLayout";
import PortalLayout from "../partials/layouts/PortalLayout";
import Unauthorized from "../partials/pages/auth/Unauthorized";

const NotFound = lazy(() => import("../partials/pages/user/NotFound/NotFound"));

const SignUpPassword = lazy(() => import("../partials/pages/auth/SignUp/SignUpPassword"));
const SignUpEmail = lazy(() => import("../partials/pages/auth/SignUp/SignUpEmail"));
const SignUpValidate = lazy(() => import("../partials/pages/auth/SignUp/SignUpValidate"));
const Profile = lazy(() => import("../partials/pages/auth/SignUp/Profile"));

const SignIn = lazy(() => import("../partials/pages/auth/SignIn/SignIn"));

const UserDashboard = lazy(() => import("../partials/pages/user/Dashboard"));
const UserBookings = lazy(() => import("../partials/pages/user/Bookings"));
const EventList = lazy(() => import("../partials/pages/user/Event/EventList"));

const AdminDashboard = lazy(() => import("../partials/pages/admin/Dashboard"));
const AdminBookings = lazy(() => import("../partials/pages/admin/Bookings"));

export const routes = [
  {
    children: [{ path: "/", element: <Navigate to="/dashboard" replace /> }],
  },
  {
    layout: AuthLayout,
    protected: true,
    children: [{ path: "/profile", element: <Profile /> }],
  },
  {
    layout: AuthLayout,
    children: [
      { path: "/signuppassword", element: <SignUpPassword /> },
      { path: "/signupemail", element: <SignUpEmail /> },
      { path: "/signupvalidate", element: <SignUpValidate /> },
      { path: "/login", element: <SignIn /> },
      { path: "/denied", element: <Unauthorized /> },
    ],
  },
  {
    layout: PortalLayout,
    protected: false, // ändra till true senare
    children: [
      { path: "/dashboard", element: <UserDashboard /> },
      { path: "/bookings", element: <UserBookings /> },
      { path: "/events", element: <EventList /> },
      
    ],
  },
  {
    layout: PortalLayout,
    protected: true,
    adminOnly: true,
    children: [
      { path: "/admin/dashboard", element: <AdminDashboard /> },
      { path: "/admin/bookings", element: <AdminBookings /> },
    ],
  },
  {
    children: [{ path: "*", element: <NotFound /> }],
  },
];
