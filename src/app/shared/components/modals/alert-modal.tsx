// alert-modal.tsx
import React from "react";
import "./alert-modal.scss";

interface AlertModalProps {
  isOpen: boolean;
  title?: string; // Optional title prop for the modal
  message: string;
  onCancel: () => void; // Only one button for OK action
  okText?: string; // Optional custom text for the OK button
  className?: string; // Optional className prop for custom styling
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  title = "Alert", // Default title
  message,
  onCancel,
  okText = "OK", // Default text for the OK button
  className = "", // Default to an empty string if no className is provided
}) => {
  if (!isOpen) return null;

  return (
    <div className={`alert-modal-overlay ${className}`}>
      <div className="alert-modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="alert-buttons">
          <button className="ok-button" onClick={onCancel}>
            {okText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
