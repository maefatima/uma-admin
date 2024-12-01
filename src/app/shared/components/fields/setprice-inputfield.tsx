import React from "react";
import "./setprice-inputfield.scss";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string; // Add the type prop here
  readOnly?: boolean;
}

const SetPriceField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  readOnly,
  type = "text", // Default type to "text" if not provided
}) => {
  return (
    <div className="input-field-container">
      <div className="input-field-label">{label}</div>
      <input
        type={type} // Use the type prop here
        className="input-field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
};

export default SetPriceField;
