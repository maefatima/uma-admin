import React from "react";
import "./settings.scss";
import PageHeading from "../../shared/components/heading/page-heading";

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
