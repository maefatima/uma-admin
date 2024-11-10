import React from "react";
import "./view-user-modal.scss";
import InputField from "../fields/InputFields";
import PrimaryButton from "../buttons/PrimaryButton";

interface ViewUserModalProps {
  username: string;
  contactNumber: string;
  email: string;
  address: string;
  gender: string;
  birthdate: string;
  profileImage: string;
  onClose: () => void;
}

const ViewUserModal: React.FC<ViewUserModalProps> = ({
  username,
  contactNumber,
  email,
  address,
  gender,
  birthdate,
  profileImage,
  onClose,
}) => {
  return (
    <div className="view-overlay">
      <div className="view-user-modal">
        <h2 className="view-title">User Informations</h2>
        <p className="view-subtitle">View Account Details</p>
        <div className="view-content">
          <div className="user-details">
            <InputField
              label="Username"
              type="text"
              value={username}
              onChange={() => {}}
              className="input-field-readonly"
            />
            <InputField
              label="Contact Number"
              type="text"
              value={contactNumber}
              onChange={() => {}}
              className="input-field-readonly"
            />
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={() => {}}
              className="input-field-readonly"
            />
            <InputField
              label="Address"
              type="text"
              value={address}
              onChange={() => {}}
              className="input-field-readonly"
            />
            <InputField
              label="Gender"
              type="text"
              value={gender}
              onChange={() => {}}
              className="input-field-readonly"
            />
            <InputField
              label="Birthdate"
              type="date"
              value={birthdate}
              onChange={() => {}}
              className="input-field-readonly"
            />
          </div>
          <div className="profile-image">
            <img src={profileImage} alt="User profile" />
          </div>
        </div>
        <PrimaryButton
          buttonText="CLOSE"
          onClick={onClose}
          className="close-button"
        />
      </div>
    </div>
  );
};

export default ViewUserModal;
