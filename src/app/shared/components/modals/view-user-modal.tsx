import React, { useState } from "react";
import "./view-user-modal.scss";
import InputField from "../fields/InputFields";
import PrimaryButton from "../buttons/PrimaryButton";
import ImageModal from "../../components/modals/image-modal";

interface ViewUserModalProps {
  username: string;
  contactNumber: string;
  email: string;
  address: string;
  gender: string;
  birthdate: string;
  profileImage: string;
  identificationCardImage: string; // Added prop for the identification card image
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
  identificationCardImage, // Receive the identification card image
  onClose,
}) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [clickedImage, setClickedImage] = useState<string>("");

  const openModal = (image: string) => {
    setClickedImage(image);
    setIsImageModalOpen(true);
  };

  const closeModal = () => {
    setIsImageModalOpen(false);
  };
  return (
    <div className="view-overlay">
      <div className="view-user-modal">
        <h2 className="view-title">User Details</h2>
        <p className="view-subtitle">View Account Information</p>
        <div className="picture-container">
          <div
            className="profile-image"
            onClick={() => openModal(profileImage)}
          >
            <img src={profileImage} alt="User profile" />
          </div>
          <div className="id-card-label">Identification Card</div>{" "}
          <div
            className="identification-card"
            onClick={() => openModal(identificationCardImage)}
          >
            <img src={identificationCardImage} alt="Identification Card" />
          </div>
        </div>

        <div className="view-content">
          <div className="user-details-column1">
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
          </div>
          <div className="user-details-column2">
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
        </div>

        <PrimaryButton
          buttonText="CLOSE"
          onClick={onClose}
          className="close-button"
        />
      </div>
      <ImageModal
        isOpen={isImageModalOpen}
        imageSrc={clickedImage}
        onClose={closeModal}
      />
    </div>
  );
};

export default ViewUserModal;
