import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthLayout from "../partials/layouts/AuthLayout";
import PortalLayout from "../partials/layouts/PortalLayout";
import Unauthorized from "../partials/pages/auth/Unauthorized";
import Gallery from "../partials/pages/user/Gallery/Gallery";
import { ProfileProvider } from "../contexts/ProfileContext";

const NotFound = lazy(() => import("../partials/pages/user/NotFound/NotFound"));

const SignUpPassword = lazy(() =>
  import("../partials/pages/auth/SignUp/SignUpPassword")
);
const SignUpEmail = lazy(() =>
  import("../partials/pages/auth/SignUp/SignUpEmail")
);
const SignUpValidate = lazy(() =>
  import("../partials/pages/auth/SignUp/SignUpValidate")
);

const Profile = lazy(() => import("../partials/pages/auth/Profile/Profile"));

const SignIn = lazy(() => import("../partials/pages/auth/SignIn/SignIn"));

const UserDashboard = lazy(() => import("../partials/pages/user/Dashboard"));
const UserBookings = lazy(() => import("../partials/pages/user/Bookings"));
const EventList = lazy(() => import("../partials/pages/user/Event/EventList"));

const AdminDashboard = lazy(() => import("../partials/pages/admin/Dashboard"));
const AdminBookings = lazy(() => import("../partials/pages/admin/Bookings"));
const PaymentPage = lazy(() =>
  import("../partials/pages/user/Payment/PaymentPage")
);

export const routes = [
  {
    children: [{ path: "/", element: <Navigate to="/dashboard" replace /> }],
  },
  {
    layout: AuthLayout,
    protected: true,
    children: [
      {
        path: "/profile",
        element: (
          <ProfileProvider>
            <Profile />
          </ProfileProvider>
        ),
      },
    ],
  },
  {
    layout: AuthLayout,
    children: [
      { path: "/signuppassword", element: <SignUpPassword /> },
      { path: "/signup", element: <SignUpEmail /> },
      { path: "/signupvalidate", element: <SignUpValidate /> },
      { path: "/login", element: <SignIn /> },
      { path: "/denied", element: <Unauthorized /> },
    ],
  },
  {
    layout: PortalLayout,
    protected: true,
    children: [
      { path: "/dashboard", element: <UserDashboard /> },
      { path: "/bookings", element: <UserBookings /> },
      { path: "/events", element: <EventList /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/payment/:eventId", element: <PaymentPage /> },
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
