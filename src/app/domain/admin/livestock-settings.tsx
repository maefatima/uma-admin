import React, { useState, useEffect } from "react";
import "./livestock-settings.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import placeholderProfileImage from "../../shared/assets/images/blank-profile.png";
import axios from "axios";
import SearchBar from "../../shared/components/search-bar/search-bar";

const initialTypes = {
  pig: true,
  goat: true,
  cow: true,
  carabao: true,
  chicken: true,
  duck: true,
};

function LivestockSettings() {
  const [livestockTypesByLocation, setLivestockTypesByLocation] = useState<{
    [town: string]: {
      [barangay: string]: Partial<typeof initialTypes>;
    };
  }>({});
  const [expandedTown, setExpandedTown] = useState<string | null>(null);

  const [adminProfile, setAdminProfile] = useState({
    username: "Loading...",
    profileImage: placeholderProfileImage,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTown, setFilterTown] = useState("");
  const [sortBy, setSortBy] = useState("a_z");

  const handleToggleLocation = (
    town: string,
    barangay: string,
    type: keyof typeof initialTypes
  ) => {
    setLivestockTypesByLocation((prev) => ({
      ...prev,
      [town]: {
        ...prev[town],
        [barangay]: {
          ...prev[town][barangay],
          [type]: !prev[town][barangay][type],
        },
      },
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("adminUsername");
        if (username) {
          const profile = await axios.get(
            "http://localhost:3000/admin-accounts/profile",
            {
              params: { username },
            }
          );
          setAdminProfile({
            username: profile.data.username,
            profileImage: profile.data.profileImage
              ? `http://localhost:3000/${profile.data.profileImage.replace(/\\/g, "/")}`
              : placeholderProfileImage,
          });
        }

        const settings = await axios.get(
          "http://localhost:3000/admin-accounts/livestock-settings/location"
        );
        setLivestockTypesByLocation(settings.data);
      } catch (err) {
        console.error("Failed to load admin or settings:", err);
      }
    };

    fetchData();
  }, []);

  const handleToggle = (
    town: string,
    barangay: string,
    type: keyof typeof initialTypes
  ) => {
    setLivestockTypesByLocation((prev) => ({
      ...prev,
      [town]: {
        ...prev[town],
        [barangay]: {
          ...prev[town][barangay],
          [type]: !prev[town][barangay][type],
        },
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axios.post(
        `http://localhost:3000/admin-accounts/livestock-settings/location`,
        livestockTypesByLocation
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
        subtitle="Manage Livestock Restrictions by Baranggay"
        profileImage={adminProfile.profileImage}
        username={adminProfile.username}
      />

      <div className="search">
        <SearchBar
          onSearch={(term) => setSearchTerm(term)}
          onSort={(sortValue) => setSortBy(sortValue)}
          onFilter={(town) => setFilterTown(town)}
          sortOptions={[
            { label: "A-Z", value: "a_z" },
            { label: "Z-A", value: "z_a" },
          ]}
          filterOptions={[
            { label: "All", value: "" },
            ...Object.keys(livestockTypesByLocation).map((town) => ({
              label: town,
              value: town,
            })),
          ]}
        />
      </div>

      <div className="livestock-settings-content">
        <h2>ASF & Disease Controls</h2>
        <p className="livestock-description">
          Enable or disable livestock types per barangay during health concerns
          and outbreaks.
        </p>

        <div className="settings-wrapper">
          {Object.entries(livestockTypesByLocation)
            .filter(([town, barangays]) => {
              const lowerSearch = searchTerm.toLowerCase();

              // Match if town name matches search OR any barangay matches search
              const matchesTown = town.toLowerCase().includes(lowerSearch);
              const matchesBarangay = Object.keys(barangays).some((barangay) =>
                barangay.toLowerCase().includes(lowerSearch)
              );

              // If a town is selected in the dropdown, filter for it
              const passesTownFilter = filterTown ? town === filterTown : true;

              return passesTownFilter && (matchesTown || matchesBarangay);
            })
            .sort(([townA], [townB]) => {
              if (sortBy === "z_a") {
                return townB.localeCompare(townA);
              }
              return townA.localeCompare(townB); // default A-Z
            })

            .map(([town, barangays]) => (
              <section className="town-section" key={town}>
                <h2 className="town-heading">
                  <span className="icon">📍</span>
                  {town}
                </h2>
                <div className="barangay-grid">
                  {Object.entries(barangays)
                    .filter(
                      ([barangay]) =>
                        barangay
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        town.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(([barangay, types]) => (
                      <div className="barangay-card" key={barangay}>
                        <div className="barangay-header">
                          <span className="icon">🏠</span>
                          <strong>{barangay}</strong>
                        </div>
                        <div className="toggle-grid">
                          {Object.entries(types).map(([type, enabled]) => (
                            <label key={type} className="toggle-row">
                              <span>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </span>
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  checked={enabled}
                                  onChange={() =>
                                    handleToggleLocation(
                                      town,
                                      barangay,
                                      type as keyof typeof initialTypes
                                    )
                                  }
                                />
                                <span className="slider round" />
                              </label>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            ))}
        </div>

        <div className="save-container">
          <button className="save-button" onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </div>

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
