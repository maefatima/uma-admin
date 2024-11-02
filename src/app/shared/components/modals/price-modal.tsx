import React, { useState, useEffect } from "react";
import "./price-modal.scss";
import PrimaryButton from "../buttons/PrimaryButton";
import SetPriceField from "../fields/setprice-inputfield";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

interface SetPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    livestockType: string;
    weight: number;
    price: number;
  }) => void;
}

function SetPriceModal({ isOpen, onClose, onSubmit }: SetPriceModalProps) {
  const [weight, setWeight] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [livestockType, setLivestockType] = useState<string>(""); // Dropdown state

  // Function to reset fields to their default values
  function resetFields() {
    setWeight("");
    setPrice("");
    setLivestockType("");
  }

  // Clear the fields when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetFields(); // Reset fields when modal is closed
    }
  }, [isOpen]);

  function handleWeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setWeight(value);
    } else {
      setWeight("");
    }
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setPrice(value);
    } else {
      setPrice("");
    }
  }

  function handleDropdownChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLivestockType(e.target.value);
  }

  function handleSubmit() {
    if (weight !== "" && price !== "" && livestockType) {
      onSubmit({ livestockType, weight: Number(weight), price: Number(price) });
      onClose(); // Close the modal after submission
      resetFields(); // Reset the fields after submission
    }
  }

  if (!isOpen) return null; // Don't render anything if modal is not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Set Suggested Price</h2>
        <p>Set Price Value per Livestock Type</p>

        <div className="dropdown-container">
          <select
            id="livestockType"
            value={livestockType}
            onChange={handleDropdownChange}
            className="dropdown"
          >
            <option value="" disabled>
              Livestock Type
            </option>
            <option value="Kabaw">Kabaw</option>
            <option value="Baka">Baka</option>
            <option value="Kanding">Kanding</option>
            <option value="Manok">Manok</option>
            <option value="Pato">Pato</option>
            <option value="Baboy">Baboy</option>
          </select>

          <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon" />
        </div>

        <div className="price-inputfields">
          <SetPriceField
            label="KG."
            type="number"
            value={weight.toString()}
            onChange={handleWeightChange}
            placeholder="Set Weight"
          />
          <SetPriceField
            label="PHP"
            type="number"
            value={price.toString()}
            onChange={handlePriceChange}
            placeholder="Set Price"
          />
        </div>

        <div className="modal-buttons">
          <PrimaryButton
            buttonText="CANCEL"
            onClick={onClose}
            className="cancel-button"
          />
          <PrimaryButton
            className="setprice"
            buttonText="SAVE"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default SetPriceModal;
