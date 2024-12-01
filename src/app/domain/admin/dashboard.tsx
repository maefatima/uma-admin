import React, { useState } from "react";
import "./dashboard.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import UserRegistrationChart from "../../shared/components/charts/user-registration";
import ActivePercentageChart from "../../shared/components/charts/active-percentage";
import DonutChart from "../../shared/components/charts/popular-livestock";
import StatCard from "../../shared/components/charts/status-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faList, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import sampleProfileImage from "../../shared/assets/images/sample-profile.jpg";

function Dashboard() {
  const [adminProfile, setAdminProfile] = useState({
    username: "Admin User",
    profileImage: sampleProfileImage,
  });

  return (
    <div className="dashboard-display">
      <PageHeading
        title="Dashboard"
        subtitle="UMA's Application Overview"
        profileImage={adminProfile.profileImage}
        username={adminProfile.username}
      />

      <div className="dashboard-content"></div>
      <UserRegistrationChart />
      <ActivePercentageChart />
      <DonutChart />
      <StatCard
        className="user-card"
        title="Total Users"
        count={850}
        icon={<FontAwesomeIcon icon={faUser} className="user-icon" />}
        iconBgColor="#FFF2E9"
      />
      <StatCard
        className="total-card"
        title="Total Listings"
        count={550}
        icon={<FontAwesomeIcon icon={faList} className="total-icon" />}
        iconBgColor="#EDE8FF"
      />
      <StatCard
        className="reports-card"
        title="Total Reports"
        count={7}
        icon={<FontAwesomeIcon icon={faFileAlt} className="reports-icon" />}
        iconBgColor="#EAF9FF"
      />
    </div>
  );
}

export default Dashboard;
