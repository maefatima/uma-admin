import React, { useState } from "react";
import "./add-admin-modal.scss";
import InputField from "../fields/InputFields";
import PrimaryButton from "../buttons/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface AddAdminModalProps {
  onClose: () => void;
  onAddAdmin: () => void;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({
  onClose,
  onAddAdmin,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    passwordMatch: "",
    profileImage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "phone" && (!/^\d*$/.test(value) || value.length > 11)) return;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));

      setErrors((prevErrors) => ({ ...prevErrors, profileImage: "" }));
    }
  };

  const togglePasswordVisibility = (field: string) => {
    if (field === "password") {
      setPasswordVisible((prev) => !prev);
    } else if (field === "confirmPassword") {
      setConfirmPasswordVisible((prev) => !prev);
    }
  };

  const isFormValid = (): boolean => {
    const { username, address, email, phone, password, confirmPassword } =
      formData;

    const newErrors = {
      username: username ? "" : "Username is required.",
      address: address ? "" : "Address is required.",
      email: email ? "" : "Email address is required.",
      phone: phone
        ? phone.length === 11
          ? ""
          : "Phone number must be 11 digits."
        : "Phone number is required.",
      password: password ? "" : "Password is required.",
      confirmPassword: confirmPassword ? "" : "Confirm password is required.",
      passwordMatch:
        password && confirmPassword && password !== confirmPassword
          ? "Passwords do not match."
          : "",
      profileImage: profileImage ? "" : "Profile image is required.",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  // const handleSubmit = () => {
  //   if (isFormValid()) {
  //     onAddAdmin(formData, profileImage);
  //   }
  // };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setIsSubmitting(true);
    try {
      // 1️⃣ Register the administrator (API request)
      const { username, email, address, phone, password } = formData;
      const response = await axios.post(
        "http://localhost:3000/admin-accounts/register",
        {
          username,
          email,
          address,
          phoneNumber: phone,
          password,
        }
      );

      console.log("Admin added successfully:", response.data);

      // 2️⃣ Upload profile image if provided
      if (profileImage) {
        const formData = new FormData();
        formData.append("file", profileImage);

        await axios.post(
          `http://localhost:3000/admin-accounts/upload-profile-image?username=${username}`,
          formData
        );

        console.log("Profile image uploaded successfully.");
      }

      alert("Administrator added successfully!");
      // onAddAdminSuccess(); // Notify parent component to update UI
      onAddAdmin();
      onClose();
    } catch (error) {
      console.error("Failed to add admin:", error);
      alert("An error occurred while adding the administrator.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-admin-overlay">
      <div className="add-admin-modal">
        <h2 className="settings-title">Add Administrator</h2>
        <p className="settings-subtitle">
          Register a new admin to manage the system
        </p>
        <div className="modal-content">
          <div className="admin-details">
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
            <div className="password-field">
              <InputField
                label="Password"
                type={passwordVisible ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                id="password"
                placeholder="Enter password"
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                className="password-toggle-icon"
                onClick={() => togglePasswordVisibility("password")}
              />
            </div>
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
            <div className="password-field">
              <InputField
                label="Confirm Password"
                type={confirmPasswordVisible ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                id="confirmPassword"
                placeholder="Confirm password"
              />
              <FontAwesomeIcon
                icon={confirmPasswordVisible ? faEyeSlash : faEye}
                className="password-toggle-icon"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
            {errors.passwordMatch && (
              <p className="error-message">{errors.passwordMatch}</p>
            )}
          </div>
          <div className="profile-image-container">
            {!previewImage && (
              <FontAwesomeIcon
                icon={faCamera}
                className="default-camera-icon"
              />
            )}
            {previewImage && <img src={previewImage} alt="Admin profile" />}
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
        <div className="image">
          {errors.profileImage && (
            <p className="error-message image-error">{errors.profileImage}</p>
          )}
        </div>
        <div className="button-container">
          <PrimaryButton
            buttonText="CANCEL"
            onClick={onClose}
            className="cancel-button"
          />
          <PrimaryButton
            buttonText="ADD"
            onClick={handleSubmit}
            className="add-admin-button"
          />
        </div>
      </div>
    </div>
  );
};

export default AddAdminModal;
