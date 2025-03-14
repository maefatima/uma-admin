import React, { useState, useRef } from "react";
import "./town-card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

interface TownUserCardProps {
  townName: string;
  barangays: string[];
  imageSrc: string;
  totalUsers: number;
}

const TownUserCard: React.FC<TownUserCardProps> = ({
  townName,
  barangays,
  imageSrc,
  totalUsers,
}) => {
  const [selectedBarangay, setSelectedBarangay] = useState(barangays[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Toggle dropdown and dynamically bind the outside click event
  const toggleDropdown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation(); // Prevent immediate closing
    setDropdownOpen(!dropdownOpen);

    if (!dropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    }
  };

  // ✅ Close dropdown when clicking outside
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
      document.removeEventListener("click", handleOutsideClick);
    }
  };

  return (
    <div className="town-card" ref={dropdownRef}>
      <div className="town-header">
        <div className="town-dropdown" onClick={toggleDropdown}>
          <span className="selected-town">{townName}</span>
          <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon" />
        </div>
        {dropdownOpen && (
          <ul className="dropdown-menu">
            {barangays.map((barangay) => (
              <li
                key={barangay}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBarangay(barangay);
                  setDropdownOpen(false);
                  document.removeEventListener("click", handleOutsideClick);
                }}
              >
                {barangay}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="town-content">
        <img src={imageSrc} alt="Barangay" className="image-placeholder" />
        <div className="user-info">
          <p className="label">Total Users</p>
          <p className="count">{totalUsers}</p>
        </div>
      </div>
    </div>
  );
};

export default TownUserCard;
