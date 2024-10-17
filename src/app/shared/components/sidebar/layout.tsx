import React from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import "./layout.scss"; // Optional, for custom layout styles

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar /> {/* Sidebar stays fixed */}
      <div className="main-content">
        <Outlet />
        {/* This will render the page content like Dashboard or User Management */}
      </div>
    </div>
  );
}

export default DashboardLayout;
