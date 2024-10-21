import React from "react";
import "./PrimaryButton.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon

interface PrimaryButtonProps {
  className?: string; // Optional className prop
  buttonText: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean; // Optional disabled prop
  icon?: any; // Optional icon prop (can be FontAwesome icon)
}

function PrimaryButton({
  className = "", // Provide a default value for className
  buttonText,
  onClick,
  disabled,
  icon, // Accept the icon prop
}: PrimaryButtonProps) {
  return (
    <div>
      <button
        className={`primary-button ${className}`} // Combine default and custom className
        onClick={onClick}
        disabled={disabled}
      >
        {icon && <FontAwesomeIcon icon={icon} className="button-icon" />}{" "}
        {/* Render icon if provided */}
        {buttonText}
      </button>
    </div>
  );
}

export default PrimaryButton;
