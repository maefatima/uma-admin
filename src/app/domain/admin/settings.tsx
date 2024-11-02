import React from "react";
import "./settings.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import SearchBar from "../../shared/components/search-bar/search-bar";

function Settings() {
  return (
    <div className="settings-display">
      <PageHeading
        title="Settings"
        subtitle="Configure System Preferences and User Options"
      />
      <div className="settings-content"></div>
    </div>
  );
}

export default Settings;
