import React, { useState, useEffect } from "react";
import "./price-monitoring.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import SetPriceModal from "../../shared/components/modals/price-modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../../shared/components/buttons/PrimaryButton";
import LivestockTable from "../../shared/components/table/livestock-table";
import LottieAnimation from "../../shared/components/lottie-animation/Animation";
import PriceAnimationData from "../../shared/assets/animation/empty.json";
import AlertModal from "../../shared/components/modals/alert-modal";
import placeholderProfileImage from "../../shared/assets/images/profile.jpg"; // Placeholder image
import axios from "axios";

interface LivestockData {
  key: number;
  livestockType: string;
  price: number;
  date: string;
}

function PriceMonitoring() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [livestockData, setLivestockData] = useState<LivestockData[]>([]);
  const [inactiveLivestockData, setInactiveLivestockData] = useState<
    LivestockData[]
  >([]);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const [adminProfile, setAdminProfile] = useState({
    username: "Loading...", // Placeholder username
    profileImage: placeholderProfileImage, // Placeholder profile image
  });

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
          return; // Optionally, navigate to login screen here
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
          alert(
            `Failed to load profile: ${err.response?.data?.message || "Error occurred."}`
          );
        } else {
          console.error("Unexpected error:", err);
        }
      }
    };

    fetchAdminProfile();
  }, []);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function handleSetPrice(newData: { livestockType: string; price: number }) {
    const dateSet = new Date().toLocaleDateString();

    const existingEntry = livestockData.find(
      (item) => item.livestockType === newData.livestockType
    );

    if (existingEntry) {
      if (existingEntry.price === newData.price) {
        setIsAlertModalOpen(true);
        return;
      } else {
        setInactiveLivestockData((prev) => [...prev, existingEntry]);
      }
    }

    setLivestockData((prevData) => [
      ...prevData.filter(
        (item) => item.livestockType !== newData.livestockType
      ),
      { ...newData, key: prevData.length + 1, date: dateSet },
    ]);

    closeModal();
  }

  const handleCloseAlertModal = () => {
    setIsAlertModalOpen(false);
  };

  return (
    <div className="price-display">
      <PageHeading
        title="Price Suggestion Monitoring"
        subtitle="Set Price Per Kilogram per Livestock Type"
        profileImage={adminProfile.profileImage}
        username={adminProfile.username}
      />
      <div className="price-content">
        <div className="setprice-button">
          <PrimaryButton
            className="price-button"
            onClick={openModal}
            buttonText="Set Price"
            icon={faPlus}
          />
        </div>

        {livestockData.length === 0 ? (
          <div className="animation">
            <LottieAnimation animationData={PriceAnimationData} />
          </div>
        ) : (
          <div className="price-table">
            <div className="active-price-table">
              <h2>Active Livestock Price List</h2>
              <LivestockTable
                data={livestockData}
                totalItems={livestockData.length}
                pageSize={10}
                currentPage={1}
                onPageChange={() => {}}
                headerBgColor="#505668"
              />
            </div>

            {inactiveLivestockData.length > 0 && (
              <div className="inactive-price-table">
                <h2>Inactive Livestock Price List</h2>
                <LivestockTable
                  data={inactiveLivestockData}
                  totalItems={inactiveLivestockData.length}
                  pageSize={10}
                  currentPage={1}
                  onPageChange={() => {}}
                  headerBgColor="#a05a54"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <SetPriceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSetPrice}
      />

      <AlertModal
        className="alert-message"
        isOpen={isAlertModalOpen}
        title="Duplicate Entry!"
        message="A same price entry for this livestock type already exists. Please enter a different price to avoid duplicates."
        onCancel={handleCloseAlertModal}
      />
    </div>
  );
}

export default PriceMonitoring;
