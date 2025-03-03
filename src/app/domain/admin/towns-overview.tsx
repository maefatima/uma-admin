import React, { useState } from "react";
import "./towns-overview.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import SearchBar from "../../shared/components/search-bar/search-bar";
import sampleProfileImage from "../../shared/assets/images/sample-profile.jpg";

function TownsOverview() {
  // Correct usage of useState inside the functional component
  const [adminProfile, setAdminProfile] = useState({
    username: "Admin User",
    profileImage: sampleProfileImage,
  });

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const handleSort = (sortValue: string) => {
    console.log("Sort by:", sortValue);
  };

  const handleFilter = (filterValue: string) => {
    console.log("Filter by:", filterValue);
  };

  return (
    <div className="message-display">
      <PageHeading
        title="Towns Overview"
        subtitle="View Town Users Overview"
        profileImage={adminProfile.profileImage}
        username={adminProfile.username}
      />
      <div className="message-content">
        <div className="search-message">
          <SearchBar
            onSearch={handleSearch}
            onSort={handleSort}
            onFilter={handleFilter}
            sortOptions={[
              { value: "name", label: "Name" },
              { value: "date", label: "Date" },
            ]}
            filterOptions={[
              { value: "admin", label: "Admin" },
              { value: "user", label: "User" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default TownsOverview;
