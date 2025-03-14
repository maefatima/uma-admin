import React, { useState, useEffect } from "react";
import "./dashboard.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import UserRegistrationChart from "../../shared/components/charts/user-registration";
// import ActivePercentageChart from "../../shared/components/charts/active-percentage";
import LottieAnimation from "../../shared/components/lottie-animation/Animation";
import AdditionalAnimationData from "../../shared/assets/animation/extradesign.json";
import reportAnimation from "../../shared/assets/images/report.svg";
import DonutChart from "../../shared/components/charts/popular-livestock";
import StatCard from "../../shared/components/charts/status-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faList, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import placeholderProfileImage from "../../shared/assets/images/profile.jpg";
import axios from "axios";

function Dashboard() {
  const [adminProfile, setAdminProfile] = useState({
    username: "Loading...",
    profileImage: placeholderProfileImage, // Default to placeholder image
  });

  const [userCount, setUserCount] = useState(0); // State for user count

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const username = localStorage.getItem("adminUsername");
        console.log(
          "Fetching admin profile for username from localStorage:",
          username
        );

        if (!username) {
          console.error(
            "No username found in localStorage. Redirecting to login..."
          );
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/admin-accounts/profile`,
          { params: { username } }
        );
        console.log("Profile data received from backend:", response.data);

        setAdminProfile({
          username: response.data.username || "Unknown User",
          profileImage: response.data.profileImage
            ? `http://localhost:3000/${response.data.profileImage.replace(
                /\\/g,
                "/"
              )}` // Prepend server URL and replace backslashes
            : placeholderProfileImage,
        });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error(
            "Axios error response:",
            err.response?.data || err.message
          );
        } else {
          console.error("Unexpected error:", err);
        }
      }
    };

    const fetchUserCount = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/count");
        setUserCount(response.data); // Update the state with the user count
      } catch (err) {
        console.error("Failed to fetch user count:", err);
      }
    };

    fetchAdminProfile();
    fetchUserCount(); // Fetch the user count when the component mounts
  }, []);

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
      {/* <ActivePercentageChart /> */}
      <DonutChart />
      <StatCard
        className="user-card"
        title="Total Users"
        count={userCount}
        icon={<FontAwesomeIcon icon={faUser} className="user-icon" />}
        iconBgColor="#d3f6b8"
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
        icon={
          <img
            src={reportAnimation}
            alt="Report Animation"
            className="report-animation"
          />
        }
        iconBgColor="#EAF9FF"
      />
      <div className="additional-animation">
        <LottieAnimation
          animationData={AdditionalAnimationData}
          loop={true}
          className="report-lottie"
        />
      </div>
    </div>
  );
}

export default Dashboard;
