import React, { useState } from "react";
import "./price-monitoring.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import SetPriceModal from "../../shared/components/modals/price-modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../../shared/components/buttons/PrimaryButton";
import LivestockTable from "../../shared/components/table/livestock-table";
import LottieAnimation from "../../shared/components/lottie-animation/Animation";
import PriceAnimationData from "../../shared/assets/animation/empty.json";
import AlertModal from "../../shared/components/modals/alert-modal";

interface LivestockData {
  key: number;
  livestockType: string;
  weight: number;
  price: number;
  date: string; // Added date field
}

function PriceMonitoring() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [livestockData, setLivestockData] = useState<LivestockData[]>([]);
  const [inactiveLivestockData, setInactiveLivestockData] = useState<
    LivestockData[]
  >([]);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false); // State for alert modal

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function handleSetPrice(newData: {
    livestockType: string;
    weight: number;
    price: number;
  }) {
    const dateSet = new Date().toLocaleDateString(); // Get current date

    // Check for an existing entry for the same livestock type
    const existingEntry = livestockData.find(
      (item) => item.livestockType === newData.livestockType
    );

    if (existingEntry) {
      // Check if the weight and price are the same as the existing entry
      if (
        existingEntry.weight === newData.weight &&
        existingEntry.price === newData.price
      ) {
        // Show the alert modal if a duplicate exists
        setIsAlertModalOpen(true);
        return; // Prevent saving the duplicate
      } else {
        // Move the existing entry to inactive list before adding the new one
        setInactiveLivestockData((prev) => [...prev, existingEntry]);
      }
    }

    // Save the new entry and remove any previous entry of the same type from the active list
    setLivestockData((prevData) => [
      ...prevData.filter(
        (item) => item.livestockType !== newData.livestockType
      ), // Remove previous entries of the same type
      { ...newData, key: prevData.length + 1, date: dateSet },
    ]);
    closeModal();
  }

  const handleCloseAlertModal = () => {
    setIsAlertModalOpen(false); // Close alert modal
  };

  return (
    <div className="price-display">
      <PageHeading
        title="Price Suggestion Monitoring"
        subtitle="Set Price Value per Livestock Type"
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
          <>
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
          </>
        )}
      </div>

      <SetPriceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSetPrice}
      />

      {/* Alert Confirmation Modal */}
      <AlertModal
        className="alert-message"
        isOpen={isAlertModalOpen}
        title="Duplicate Entry Alert"
        message="An entry with the same livestock type, weight, or price already exists."
        onCancel={handleCloseAlertModal}
      />
    </div>
  );
}

export default PriceMonitoring;
