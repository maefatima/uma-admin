import React from "react";
import "./dashboard.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import UserRegistrationChart from "../../shared/components/charts/user-registration";

function Dashboard() {
  return (
    <div className="dashboard-display">
      <PageHeading title="Dashboard" subtitle="UMA's Application Overview" />

      <div className="dashboard-content"></div>
      <UserRegistrationChart />
    </div>
  );
}

export default Dashboard;
