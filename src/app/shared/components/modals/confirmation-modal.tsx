import React from "react";
import "./confirmation-modal.scss";

interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string; // Optional title prop for the modal
  message: string;
  onConfirm: () => void;
  onCancel?: () => void; // Optional onCancel prop
  confirmText?: string; // Optional custom text for the confirm button
  cancelText?: string; // Optional custom text for the cancel button
  className?: string; // Optional className prop for custom styling
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title = "Logout",
  message,
  onConfirm,
  onCancel,
  confirmText = "YES", // Default text for the confirm button
  cancelText = "CANCEL", // Default text for the cancel button
  className = "", // Default to an empty string if no className is provided
}) => {
  if (!isOpen) return null;

  return (
    <div className={`confirmation-modal-overlay ${className}`}>
      <div className="confirmation-modal">
        <h2 className="modal-title">{title}</h2> {/* Add title */}
        <p className="modal-message">{message}</p>
        <div className="confirmation-buttons">
          <button className="yes-button" onClick={onConfirm}>
            {confirmText}
          </button>
          {onCancel && (
            <button className="no-button" onClick={onCancel}>
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
