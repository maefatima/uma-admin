import React from "react";
import "./confirm-user-status.scss";
import { CloseOutlined } from "@ant-design/icons";

interface ConfirmUserStatusProps {
  isOpen: boolean;
  message: string;
  onApprove: () => void;
  onReject: () => void;
  onCancel?: () => void; // Optional onCancel prop
  confirmText?: string; // Optional custom text for the approve button
  rejectText?: string; // Optional custom text for the reject button
  cancelText?: string; // Optional custom text for the cancel button
  className?: string; // Optional className prop for custom styling
}

const ConfirmUserStatus: React.FC<ConfirmUserStatusProps> = ({
  isOpen,
  message,
  onApprove,
  onReject,
  onCancel,
  confirmText = "APPROVE", // Default text for the approve button
  rejectText = "REJECT", // Default text for the reject button
  cancelText = "CANCEL", // Default text for the cancel button
  className = "", // Default to an empty string if no className is provided
}) => {
  if (!isOpen) return null;

  return (
    <div className={`confirm-user-status-overlay ${className}`}>
      <div className="confirm-user-status-modal">
        <h1>User Account Status</h1>
        <p>{message}</p>

        {/* Close Icon in top right corner */}
        {onCancel && (
          <CloseOutlined className="cancel-icon" onClick={onCancel} />
        )}

        <div className="confirm-user-status-buttons">
          <button className="reject-button" onClick={onReject}>
            {rejectText}
          </button>
          <button className="approve-button" onClick={onApprove}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUserStatus;
