import React from "react";
import "./InputFields.scss";

interface InputFieldProps {
  className?: string;
  label: string;
  type: string;
  value: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  labelPosition?: "above" | "inline";
}

function InputField({
  className,
  label,
  type,
  value,
  id,
  onChange,
  placeholder,
  required,
  readOnly = false,
  labelPosition = "above",
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
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
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
