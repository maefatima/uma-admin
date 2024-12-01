import React from "react";
import "./flagged-modal.scss";
import InputField from "../fields/InputFields";
import PrimaryButton from "../buttons/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

interface FlaggedModalProps {
  username: string;
  reportedBy: string;
  reason: string;
  actionOptions: string[];
  notifyUser: boolean; // Add this line
  profileImage: string;
  onClose: () => void;
  onSave: () => void;
  onNotifyChange: (checked: boolean) => void; // Specify boolean type for `checked`
  onActionChange: (action: string) => void;
  selectedAction: string;
}

const FlaggedModal: React.FC<FlaggedModalProps> = ({
  username,
  reportedBy,
  reason,
  actionOptions,
  notifyUser,
  profileImage,
  onClose,
  onSave,
  onNotifyChange,
  onActionChange,
}) => {
  return (
    <div className="flag-overlay">
      <div className="flagged-modal">
        <h2 className="flag-title">Flag or Report User</h2>
        <p className="flag-subtitle">Review User Reports and Issues</p>
        <div className="flag-content">
          <div className="upper-section">
            <InputField
              label="Username"
              type="text"
              value={username}
              onChange={() => {}}
              className="input-field-readonly"
            />
            <div className="profile-image">
              <img src={profileImage} alt="User profile" />
            </div>
          </div>
          <hr />
          <div className="lower-section">
            <div className="fields">
              <InputField
                label="Reported By"
                type="text"
                value={reportedBy}
                onChange={() => {}}
                className="input-field-readonly"
              />
              <InputField
                label="Reason"
                type="text"
                value={reason}
                onChange={() => {}}
                className="input-field-readonly"
              />
            </div>
            <div className="action-section">
              <label className="action-label">
                What action would you like to do?
              </label>
              <select
                className="action-dropdown"
                onChange={(e) => onActionChange(e.target.value)}
              >
                {actionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon" />
              <div className="notify-checkbox">
                <input
                  type="checkbox"
                  id="notifyUser"
                  checked={notifyUser}
                  onChange={(e) => onNotifyChange(e.target.checked)}
                />
                <label htmlFor="notifyUser">Notify User</label>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-buttons">
          <PrimaryButton
            buttonText="CANCEL"
            onClick={onClose}
            className="cancel-button"
          />
          <PrimaryButton
            buttonText="SAVE"
            onClick={onSave}
            className="save-button"
          />
        </div>
      </div>
    </div>
  );
};

export default FlaggedModal;
