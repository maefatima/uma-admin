import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginForm from "../../domain/login/LoginForm";
import DashboardLayout from "../../shared/components/sidebar/layout";
import Dashboard from "../../domain/admin/dashboard";
import UserManagement from "../../domain/admin/user-management";
// import ContentModeration from "../../domain/admin/content-moderation";
// import Message from "../../domain/admin/message";
import PriceMonitoring from "../../domain/admin/price-monitoring";
import Settings from "../../domain/admin/settings";
import Welcome from "../../domain/login/welcome";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "welcome",
        element: <Welcome />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "user-management",
            element: <UserManagement />,
          },
          // {
          //   path: "content-moderation",
          //   element: <ContentModeration />,
          // },
          // {
          //   path: "message",
          //   element: <Message />,
          // },
          {
            path: "price-monitoring",
            element: <PriceMonitoring />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);

export function AppRoute() {
  return <RouterProvider router={router} />;
}
