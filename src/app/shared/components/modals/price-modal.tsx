import React, { useState, useEffect } from "react";
import "./price-modal.scss";
import PrimaryButton from "../buttons/PrimaryButton";
import SetPriceField from "../fields/setprice-inputfield";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

interface SetPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { livestockType: string; price: number }) => void;
}

function SetPriceModal({ isOpen, onClose, onSubmit }: SetPriceModalProps) {
  const [price, setPrice] = useState<number | "">("");
  const [livestockType, setLivestockType] = useState<string>("");

  function resetFields() {
    setPrice("");
    setLivestockType("");
  }

  useEffect(() => {
    if (!isOpen) {
      resetFields();
    }
  }, [isOpen]);

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(e.target.value);
    setPrice(isNaN(value) ? "" : value);
  }

  function handleDropdownChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLivestockType(e.target.value);
  }

  function handleSubmit() {
    if (price !== "" && livestockType) {
      onSubmit({ livestockType, price: Number(price) });
      onClose();
      resetFields();
    }
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Set Suggested Price</h2>
        <p>Set Price Per Kilogram per Livestock Type</p>

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
            label="Price Per Kilogram"
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
