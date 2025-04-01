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
import placeholderProfileImage from "../../shared/assets/images/blank-profile.png";
import axios from "axios";

function Dashboard() {
  const [adminProfile, setAdminProfile] = useState({
    username: "Loading...",
    profileImage: placeholderProfileImage, // Default to placeholder image
  });

  const [userCount, setUserCount] = useState(0); // State for user count
  const [reportCount, setReportCount] = useState(0); // State for total reports
  const [listingCount, setListingCount] = useState(0);
  const [popularLivestock, setPopularLivestock] = useState([]); // For DonutChart
  const [popularLivestockTotal, setPopularLivestockTotal] = useState(0);

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
          `https://uma-backend-production-d139.up.railway.app/admin-accounts/profile`,
          { params: { username } }
        );
        console.log("Profile data received from backend:", response.data);

        setAdminProfile({
          username: response.data.username || "Unknown User",
          profileImage: response.data.profileImage
            ? `https://uma-backend-production-d139.up.railway.app/${response.data.profileImage.replace(
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
        const response = await axios.get(
          "https://uma-backend-production-d139.up.railway.app/users/count"
        );
        setUserCount(response.data); // Update the state with the user count
      } catch (err) {
        console.error("Failed to fetch user count:", err);
      }
    };

    fetchAdminProfile();
    fetchUserCount(); // Fetch the user count when the component mounts
  }, []);

  useEffect(() => {
    const fetchReportCount = async () => {
      try {
        const response = await axios.get(
          "https://uma-backend-production-d139.up.railway.app/reports/all"
        ); // Fetch reports
        setReportCount(response.data.length); // Set total report count
      } catch (err) {
        console.error("Failed to fetch report count:", err);
      }
    };

    fetchReportCount();
  }, []);

  useEffect(() => {
    const fetchTotalListings = async () => {
      try {
        const res = await axios.get(
          "https://uma-backend-production-d139.up.railway.app/livestock-listings/count"
        );
        setListingCount(res.data);
      } catch (err) {
        console.error("Error fetching total listings:", err);
      }
    };

    const fetchPopularLivestock = async () => {
      try {
        const res = await axios.get(
          "https://uma-backend-production-d139.up.railway.app/livestock-listings/popular"
        );
        console.log("✅ Popular Livestock Raw Response:", res.data);

        setPopularLivestock(res.data.topTypes ?? []); // safe fallback
        setPopularLivestockTotal(res.data.total ?? 0);
      } catch (err) {
        console.error("Error fetching popular livestock data:", err);
      }
    };

    fetchTotalListings();
    fetchPopularLivestock();
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
      <DonutChart data={popularLivestock} totalCount={popularLivestockTotal} />

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
        count={listingCount}
        icon={<FontAwesomeIcon icon={faList} className="total-icon" />}
        iconBgColor="#EDE8FF"
      />
      <StatCard
        className="reports-card"
        title="Total Reports"
        count={reportCount}
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
