import React from "react";
import "./InputFields.scss"; // For styling

interface InputFieldProps {
  className?: string; // Optional className prop
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

function InputField({
  className, // Destructure the className prop
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
}: InputFieldProps) {
  return (
    <div className={`input-field ${className ? className : ""}`}>
      {" "}
      {/* Apply custom className */}
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <input
        type={type}
        id={label.toLowerCase()}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default InputField;
