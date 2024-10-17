import React from "react";
import "./user-management.scss";
import PageHeading from "../../shared/components/heading/page-heading";

function UserManagement() {
  return (
    <div className="user-display">
      <PageHeading
        title="User Management"
        subtitle="Manage, Create, and Edit System Users"
      />

      <div className="user-content"></div>
    </div>
  );
}

export default UserManagement;
