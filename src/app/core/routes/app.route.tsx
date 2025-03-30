import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import LoginForm from "../../domain/login/LoginForm";
import DashboardLayout from "../../shared/components/sidebar/layout";
import Dashboard from "../../domain/admin/dashboard";
import UserManagement from "../../domain/admin/user-management";
import ContentModeration from "../../domain/admin/report-management";
// import PriceMonitoring from "../../domain/admin/price-monitoring";
import Settings from "../../domain/admin/settings";
import ReportManagement from "../../domain/admin/report-management";
import TownsOverview from "../../domain/admin/towns-overview";
// import Welcome from "../../domain/login/welcome";
import PrivateRoute from "./private-route";
import LivestockSettings from "../../domain/admin/livestock-settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />, // Redirect root path to /login
  },
  {
    path: "login",
    element: <LoginForm />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "livestock-settings", element: <LivestockSettings /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "report-management", element: <ReportManagement /> },
      { path: "towns-overview", element: <TownsOverview /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

export function AppRoute() {
  return <RouterProvider router={router} />;
}
