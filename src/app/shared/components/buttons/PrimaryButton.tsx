import React from "react";
import "./PrimaryButton.scss";

interface PrimaryButtonProps {
  className?: string; // Optional className prop
  buttonText: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean; // Optional disabled prop
}

function PrimaryButton({
  className = "", // Provide a default value for className
  buttonText,
  onClick,
  disabled,
}: PrimaryButtonProps) {
  return (
    <div>
      <button
        className={`primary-button ${className}`} // Combine default and custom className
        onClick={onClick}
        disabled={disabled}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default PrimaryButton;
