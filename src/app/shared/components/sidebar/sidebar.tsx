import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  faThLarge,
  faUsers,
  // faStickyNote,
  // faComment,
  faClipboardList,
  faEarthAmericas,
  // faCoins,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./sidebar.scss";
import logo from "../../assets/images/sidabar_logo.png";
import SidebarIconButton from "../buttons/sidebar-icon-button";
import ConfirmationModal from "../modals/confirmation-modal";
import { faBacon } from "@fortawesome/free-solid-svg-icons";

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
    localStorage.removeItem("adminUsername"); // 🚀 Clear stored admin session
    setShowLogoutModal(false);
    navigate("/login", { replace: true }); // 🚀 Redirect to login
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
        <SidebarIconButton
          className="icon-button"
          to="/dashboard/report-management"
          icon={faClipboardList}
          tooltip="Report Management"
          isActive={activePath === "/dashboard/report-management"}
          onClick={() => setActivePath("/dashboard/report-management")}
        />
        <SidebarIconButton
          className="icon-button"
          to="/dashboard/towns-overview"
          icon={faEarthAmericas}
          tooltip="Towns Overview"
          isActive={activePath === "/dashboard/towns-overview"}
          onClick={() => setActivePath("/dashboard/towns-overview")}
        />
        {/* <SidebarIconButton
          className="icon-button"
          to="/dashboard/price-monitoring"
          icon={faEarthAmericas}
          tooltip="Price Suggestion Monitoring"
          isActive={activePath === "/dashboard/price-monitoring"}
          onClick={() => setActivePath("/dashboard/price-monitoring")}
        /> */}
        <SidebarIconButton
          className="icon-button"
          to="/dashboard/livestock-settings"
          icon={faBacon}
          tooltip="Livestock Types"
          isActive={activePath === "/dashboard/livestock-settings"}
          onClick={() => setActivePath("/dashboard/livestock-settings")}
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
        title="Logout"
        message="Are you sure you want to log out?"
        onConfirm={confirmLogout} // Use the correct handler
        onCancel={cancelLogout} // Use the correct handler
      />
    </div>
  );
}

export default Sidebar;
