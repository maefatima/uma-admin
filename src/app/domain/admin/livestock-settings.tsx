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
  //         `http://localhost:3000/admin-accounts/profile`,
  //         { params: { username } }
  //       );

  //       setAdminProfile({
  //         username: response.data.username || "Unknown User",
  //         profileImage: response.data.profileImage
  //           ? `http://localhost:3000/${response.data.profileImage.replace(/\\/g, "/")}`
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
            `http://localhost:3000/admin-accounts/profile`,
            { params: { username } }
          );

          setAdminProfile({
            username: profileRes.data.username || "Unknown User",
            profileImage: profileRes.data.profileImage
              ? `http://localhost:3000/${profileRes.data.profileImage.replace(/\\/g, "/")}`
              : placeholderProfileImage,
          });
        }

        const settingsRes = await axios.get(
          `http://localhost:3000/admin-accounts/livestock-settings`
        );

        setLivestockTypes(settingsRes.data);
      } catch (err) {
        console.error("Error fetching admin data or livestock settings:", err);
      }
    };

    fetchAdminProfileAndSettings();
  }, []);

  const handleSave = async () => {
    try {
      console.log("Saving livestock type settings:", livestockTypes);

      await axios.post(
        `http://localhost:3000/admin-accounts/livestock-settings`,
        livestockTypes // ✅ only changed values
      );

      alert("Livestock Settings Updated Successfully!");
    } catch (error) {
      console.error("Failed to save livestock settings:", error);
      alert("Failed to save settings. Please try again.");
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
    </div>
  );
}

export default LivestockSettings;
