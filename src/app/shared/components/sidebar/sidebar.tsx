import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  faThLarge,
  faUsers,
  // faStickyNote,
  // faComment,
  faCoins,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./sidebar.scss";
import logo from "../../assets/images/logo.png";
import SidebarIconButton from "../buttons/sidebar-icon-button";
import ConfirmationModal from "../modals/confirmation-modal";

function Sidebar() {
  const [activePath, setActivePath] = useState("/dashboard"); // Track active route
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Set the active path based on the current route
  React.useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate("/login"); // Redirect to login after confirming
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="sidebar-links">
        <SidebarIconButton
          className="icon-button"
          to="/dashboard"
          icon={faThLarge}
          tooltip="Dashboard"
          isActive={activePath === "/dashboard"} // Check active state
          onClick={() => setActivePath("/dashboard")} // Set active on click
        />
        <SidebarIconButton
          className="icon-button"
          to="/dashboard/user-management"
          icon={faUsers}
          tooltip="User Management"
          isActive={activePath === "/dashboard/user-management"}
          onClick={() => setActivePath("/dashboard/user-management")}
        />
        {/* <SidebarIconButton
          className="icon-button"
          to="/dashboard/content-moderation"
          icon={faStickyNote}
          tooltip="Content Moderation"
          isActive={activePath === "/dashboard/content-moderation"}
          onClick={() => setActivePath("/dashboard/content-moderation")}
        />
        <SidebarIconButton
          className="icon-button"
          to="/dashboard/message"
          icon={faComment}
          tooltip="Messages"
          isActive={activePath === "/dashboard/message"}
          onClick={() => setActivePath("/dashboard/message")}
        /> */}
        <SidebarIconButton
          className="icon-button"
          to="/dashboard/price-monitoring"
          icon={faCoins}
          tooltip="Price Suggestion Monitoring"
          isActive={activePath === "/dashboard/price-monitoring"}
          onClick={() => setActivePath("/dashboard/price-monitoring")}
        />
        <SidebarIconButton
          className="icon-button"
          to="/dashboard/settings"
          icon={faCog}
          tooltip="Settings"
          isActive={activePath === "/dashboard/settings"}
          onClick={() => setActivePath("/dashboard/settings")}
        />
      </div>

      <div className="sidebar-footer">
        <SidebarIconButton
          className="logout-button"
          to="#"
          icon={faSignOutAlt}
          tooltip="Logout"
          isActive={activePath === "/logout"}
          onClick={handleLogoutClick}
        />
      </div>

      <ConfirmationModal
        isOpen={showLogoutModal} // Use the correct state variable
        message="Are you sure you want to log out?"
        onConfirm={confirmLogout} // Use the correct handler
        onCancel={cancelLogout} // Use the correct handler
      />
    </div>
  );
}

export default Sidebar;
