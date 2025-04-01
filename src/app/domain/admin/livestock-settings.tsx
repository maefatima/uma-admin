import React, { useState, useEffect } from "react";
import "./livestock-settings.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import placeholderProfileImage from "../../shared/assets/images/blank-profile.png";
import axios from "axios";

const initialTypes = {
  pig: true,
  goat: true,
  cow: true,
  carabao: true,
  chicken: true,
  duck: true,
};

function LivestockSettings() {
  const [livestockTypes, setLivestockTypes] = useState<
    Partial<typeof initialTypes>
  >({});
  const [adminProfile, setAdminProfile] = useState({
    username: "Loading...",
    profileImage: placeholderProfileImage,
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState<
    keyof typeof initialTypes | null
  >(null);
  const [nextState, setNextState] = useState<boolean>(false);
  const validKeys = Object.keys(initialTypes);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleToggleClick = (type: keyof typeof initialTypes) => {
    setSelectedType(type);
    setNextState(!livestockTypes[type]);
    setShowModal(true);
  };

  const confirmToggle = () => {
    if (selectedType) {
      setLivestockTypes((prev) => ({
        ...prev,
        [selectedType]: nextState,
      }));
    }
    setShowModal(false);
  };

  const cancelToggle = () => {
    setShowModal(false);
    setSelectedType(null);
  };

  // useEffect(() => {
  //   const fetchAdminProfile = async () => {
  //     try {
  //       const username = localStorage.getItem("adminUsername");
  //       if (!username) return;

  //       const response = await axios.get(
  //         `https://uma-backend-production-d139.up.railway.app/admin-accounts/profile`,
  //         { params: { username } }
  //       );

  //       setAdminProfile({
  //         username: response.data.username || "Unknown User",
  //         profileImage: response.data.profileImage
  //           ? `https://uma-backend-production-d139.up.railway.app/${response.data.profileImage.replace(/\\/g, "/")}`
  //           : placeholderProfileImage,
  //       });
  //     } catch (err) {
  //       console.error("Error fetching admin profile:", err);
  //     }
  //   };

  //   fetchAdminProfile();
  // }, []);

  useEffect(() => {
    const fetchAdminProfileAndSettings = async () => {
      try {
        const username = localStorage.getItem("adminUsername");

        if (username) {
          const profileRes = await axios.get(
            `https://uma-backend-production-d139.up.railway.app/admin-accounts/profile`,
            { params: { username } }
          );

          setAdminProfile({
            username: profileRes.data.username || "Unknown User",
            profileImage: profileRes.data.profileImage
              ? `https://uma-backend-production-d139.up.railway.app/${profileRes.data.profileImage.replace(/\\/g, "/")}`
              : placeholderProfileImage,
          });
        }

        const settingsRes = await axios.get(
          `https://uma-backend-production-d139.up.railway.app/admin-accounts/livestock-settings`
        );

        // ✅ Only include keys that exist in initialTypes
        const validKeys = Object.keys(initialTypes);

        const filteredSettings = Object.fromEntries(
          Object.entries(settingsRes.data).filter(([key]) =>
            validKeys.includes(key)
          )
        );

        setLivestockTypes(filteredSettings);
      } catch (err) {
        console.error("Error fetching admin data or livestock settings:", err);
      }
    };

    fetchAdminProfileAndSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      console.log("Saving livestock type settings:", livestockTypes);

      await axios.post(
        `https://uma-backend-production-d139.up.railway.app/admin-accounts/livestock-settings`,
        livestockTypes // ✅ only changed values
      );

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Failed to save livestock settings:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="livestock-settings-display">
      <PageHeading
        title="Livestock Settings"
        subtitle="Manage Livestock Types"
        profileImage={adminProfile.profileImage}
        username={adminProfile.username}
      />

      <div className="livestock-settings-content">
        <h2>Toggle Livestock Types</h2>
        <p className="livestock-description">
          Enable or disable livestock types that users are allowed to list.
        </p>

        {/* <div className="toggle-list">
          {Object.entries(livestockTypes).map(([type, enabled]) => (
            <div className="toggle-item" key={type}>
              <span className="toggle-label">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() =>
                    handleToggleClick(type as keyof typeof initialTypes)
                  }
                />
                <span className="slider round"></span>
              </label>
            </div>
          ))}
        </div> */}

        <div className="toggle-container">
          <div className="toggle-label-header">
            <h3>Livestock Listing Options</h3>
            <p>Turn on/off livestock types available for listing in the app.</p>
          </div>

          <div className="toggle-list">
            {Object.entries(livestockTypes).map(([type, enabled]) => (
              <div className="toggle-item" key={type}>
                <span className="toggle-label">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() =>
                      handleToggleClick(type as keyof typeof initialTypes)
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            ))}
          </div>

          <button className="save-button" onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </div>

      {showModal && selectedType && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <h3>Confirm Toggle</h3>
            <p>
              Are you sure you want to{" "}
              <strong>{nextState ? "enable" : "disable"}</strong>{" "}
              <strong>
                {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
              </strong>{" "}
              listings?
            </p>
            <div className="modal-actions">
              <button onClick={confirmToggle} className="confirm-btn">
                Yes
              </button>
              <button onClick={cancelToggle} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isSaving && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Saving Settings...</p>
        </div>
      )}

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <h3>Success</h3>
            <p>Livestock Settings Updated Successfully!</p>
            <div className="modal-actions">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="confirm-btn"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LivestockSettings;
