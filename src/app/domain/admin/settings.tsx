import React, { useState, useEffect } from "react";
import "./settings.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import PrimaryButton from "../../shared/components/buttons/PrimaryButton";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import InputField from "../../shared/components/fields/InputFields";
import AddAdminModal from "../../shared/components/modals/add-admin-modal";
import EditProfileModal from "../../shared/components/modals/edit-profile-modal";
import placeholderProfileImage from "../../shared/assets/images/blank-profile.png"; // Placeholder image
import axios from "axios";

type UpdatedFormData = {
  username: string;
  email: string;
  address: string;
  phone: string;
};

function Settings() {
  const [formData, setFormData] = useState({
    username: "Loading...", // Placeholder username
    address: "Loading...", // Placeholder address
    email: "Loading...", // Placeholder email
    phone: "Loading...", // Placeholder phone number
    profileImage: placeholderProfileImage, // Default profile image
  });

  const [isAddAdminModalOpen, setAddAdminModalOpen] = useState(false);
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);

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
        return; // Optionally, navigate to the login screen here
      }

      const response = await axios.get(
        `https://uma-backend-production-d139.up.railway.app/admin-accounts/profile`,
        { params: { username } }
      );
      console.log("Profile data received from backend:", response.data);

      setFormData({
        username: response.data.username || "Unknown User",
        address: response.data.address || "No address provided",
        email: response.data.email || "No email provided",
        phone: response.data.phoneNumber || "No phone number provided",
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
        alert(
          `Failed to load profile: ${err.response?.data?.message || "Error occurred."}`
        );
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const handleEditProfile = () => {
    setEditProfileModalOpen(true);
  };

  const handleAddAdmin = () => {
    setAddAdminModalOpen(true);
  };

  const handleCloseAddAdminModal = () => {
    setAddAdminModalOpen(false);
  };

  const handleCloseEditProfileModal = () => {
    setEditProfileModalOpen(false);
  };

  const handleAddAdminSubmit = () => {
    alert("New Administrator added!");
    setAddAdminModalOpen(false);
  };

  const handleSaveProfile = async (
    updatedFormData: UpdatedFormData,
    updatedProfileImage: File | null
  ) => {
    try {
      const currentUsername = localStorage.getItem("adminUsername");
      if (!currentUsername) {
        console.error("No username found in localStorage.");
        return;
      }

      const updatedData = {
        newUsername: updatedFormData.username,
        email: updatedFormData.email,
        address: updatedFormData.address,
        phoneNumber: updatedFormData.phone,
      };

      // Update text fields in backend
      await axios.put(
        `https://uma-backend-production-d139.up.railway.app/admin-accounts/update`,
        {
          username: currentUsername,
          ...updatedData,
        }
      );

      // If a new profile image is uploaded, send it to the backend
      if (updatedProfileImage) {
        const formData = new FormData();
        formData.append("file", updatedProfileImage);
        await axios.post(
          `https://uma-backend-production-d139.up.railway.app/admin-accounts/upload-profile-image?username=${updatedFormData.username}`,
          formData
        );
      }

      // Update localStorage with the new username
      localStorage.setItem("adminUsername", updatedFormData.username);

      alert("Profile updated successfully!");

      // Refetch profile to reflect changes
      fetchAdminProfile();
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert("An error occurred while updating your profile. Please try again.");
    } finally {
      setEditProfileModalOpen(false);
    }
  };

  return (
    <div className="settings-display">
      <PageHeading
        title="Settings"
        subtitle="Manage Your Profile or Add New Administrator"
        profileImage={formData.profileImage}
        username={formData.username}
      />
      <div className="settings-content">
        <div className="add-admin-button">
          <PrimaryButton
            className="add-button"
            onClick={handleAddAdmin}
            buttonText="Add Administrator"
            icon={faPlus}
          />
        </div>

        <div className="profile-container">
          <div className="profile-info">
            <h2>Profile Information</h2>
            <InputField
              className="settings-field"
              label="Username"
              type="text"
              value={formData.username}
              readOnly={true}
            />
            <InputField
              className="settings-field"
              label="Address"
              type="text"
              value={formData.address}
              readOnly={true}
            />
            <InputField
              className="settings-field"
              label="Email Address"
              type="email"
              value={formData.email}
              readOnly={true}
            />
            <InputField
              className="settings-field"
              label="Phone Number"
              type="tel"
              value={formData.phone}
              readOnly={true}
            />
          </div>

          <div className="profile-picture">
            <img
              src={formData.profileImage}
              alt="Profile"
              className="profile-image"
            />
            <PrimaryButton
              className="edit-profile-button"
              onClick={handleEditProfile}
              buttonText="Edit Profile"
              icon={faEdit}
            />
          </div>
        </div>
      </div>

      {isAddAdminModalOpen && (
        <AddAdminModal
          onClose={handleCloseAddAdminModal}
          onAddAdmin={handleAddAdminSubmit}
        />
      )}

      {isEditProfileModalOpen && (
        <EditProfileModal
          onClose={handleCloseEditProfileModal}
          onSaveProfile={handleSaveProfile}
          existingData={formData}
        />
      )}
    </div>
  );
}

export default Settings;
