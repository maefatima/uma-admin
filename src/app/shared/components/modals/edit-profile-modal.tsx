import React, { useState } from "react";
import "./edit-profile-modal.scss";
import InputField from "../fields/InputFields";
import PrimaryButton from "../buttons/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

interface EditProfileModalProps {
  onClose: () => void;
  onSaveProfile: (formData: any, profileImage: File | null) => void;
  existingData: {
    username: string;
    address: string;
    email: string;
    phone: string;
    profileImage: string;
  };
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  onClose,
  onSaveProfile,
  existingData,
}) => {
  const [formData, setFormData] = useState({
    username: existingData.username,
    address: existingData.address,
    email: existingData.email,
    phone: existingData.phone,
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(
    existingData.profileImage
  );

  const [errors, setErrors] = useState({
    username: "",
    address: "",
    email: "",
    phone: "",
  });

  const validateField = (id: string, value: string) => {
    let error = "";
    switch (id) {
      case "username":
        error = value ? "" : "Username is required.";
        break;
      case "address":
        error = value ? "" : "Address is required.";
        break;
      case "email":
        error = value ? "" : "Email address is required.";
        break;
      case "phone":
        if (!value) {
          error = "Phone number is required.";
        } else if (value.length !== 11) {
          error = "Phone number must be 11 digits.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "phone" && (!/^\d*$/.test(value) || value.length > 11)) return;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: validateField(id, value),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const isFormValid = (): boolean => {
    const { username, address, email, phone } = formData;

    const newErrors = {
      username: validateField("username", username),
      address: validateField("address", address),
      email: validateField("email", email),
      phone: validateField("phone", phone),
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleSave = () => {
    if (isFormValid()) {
      onSaveProfile(formData, profileImage);
    }
  };

  return (
    <div className="edit-profile-overlay">
      <div className="edit-profile-modal">
        <h2 className="edit-title">Edit Profile</h2>
        <p className="edit-subtitle">Modify Your Profile Information</p>
        <div className="edit-content">
          <div className="profile-details">
            <InputField
              label="Username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              id="username"
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="error-message">{errors.username}</p>
            )}
            <InputField
              label="Address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              id="address"
              placeholder="Enter address"
            />
            {errors.address && (
              <p className="error-message">{errors.address}</p>
            )}
            <InputField
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              placeholder="Enter email"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
            <InputField
              label="Phone Number"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              id="phone"
              placeholder="Enter phone number"
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>
          <div className="profile-image-container">
            <img src={previewImage} alt="Profile" />
            <label htmlFor="profileImage" className="camera-button">
              <FontAwesomeIcon icon={faCamera} />
            </label>
            <input
              type="file"
              id="profileImage"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div className="button-container">
          <PrimaryButton
            buttonText="CANCEL"
            onClick={onClose}
            className="cancel-button"
          />
          <PrimaryButton
            buttonText="SAVE"
            onClick={handleSave}
            className="save-button"
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
