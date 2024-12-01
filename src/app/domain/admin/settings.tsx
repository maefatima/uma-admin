import React, { useState } from "react";
import "./settings.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import PrimaryButton from "../../shared/components/buttons/PrimaryButton";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import InputField from "../../shared/components/fields/InputFields";
import AddAdminModal from "../../shared/components/modals/add-admin-modal";
import EditProfileModal from "../../shared/components/modals/edit-profile-modal";

function Settings() {
  const [formData, setFormData] = useState({
    username: "Maria Leah Asilum",
    address: "Banlasan, Tubigon, Bohol",
    email: "marialeah.asilum@bisu.edu.ph",
    phone: "09055885743",
    profileImage: "https://via.placeholder.com/150", // Default profile image
  });

  const [isAddAdminModalOpen, setAddAdminModalOpen] = useState(false);
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);

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

  const handleSaveProfile = (
    updatedFormData: any,
    updatedProfileImage: File | null
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...updatedFormData,
      profileImage: updatedProfileImage
        ? URL.createObjectURL(updatedProfileImage)
        : prevFormData.profileImage,
    }));
    setEditProfileModalOpen(false);
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
