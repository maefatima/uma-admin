import React from "react";
import "./InputFields.scss"; // For styling

interface InputFieldProps {
  className?: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  labelPosition?: "above" | "inline"; // New prop to customize label position
}

function InputField({
  className,
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
  labelPosition = "above", // Default to "above"
}: InputFieldProps) {
  return (
    <div
      className={`input-field ${className ? className : ""} ${labelPosition}`}
    >
      {labelPosition === "above" && (
        <label htmlFor={label.toLowerCase()}>{label}</label>
      )}
      <input
        type={type}
        id={label.toLowerCase()}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {labelPosition === "inline" && (
        <label htmlFor={label.toLowerCase()} className="inline-label">
          {label}
        </label>
      )}
    </div>
  );
}

export default InputField;
