import { NavLink } from "react-router-dom"; // NavLink to handle active state
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface SidebarIconButtonProps {
  className?: string;
  to: string; // The route path
  icon: IconDefinition; // The FontAwesome icon to use
  tooltip: string; // Tooltip text for the button
  isActive: boolean; // Active state
  onClick: () => void; // On click handler
}

function SidebarIconButton({
  to,
  className,
  icon,
  tooltip,
  isActive,
  onClick,
}: SidebarIconButtonProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "active" : "inactive")}
    >
      <button
        className={`icon-button ${className} ${isActive ? "active" : "inactive"} ${to === "/logout" ? "logout-button" : ""}`}
        title={tooltip}
        onClick={onClick} // Set active state when clicked
      >
        <FontAwesomeIcon icon={icon} className="icon" />
      </button>
    </NavLink>
  );
}

export default SidebarIconButton;
