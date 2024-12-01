import React, { useState } from "react";
import "./message.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import SearchBar from "../../shared/components/search-bar/search-bar";
import sampleProfileImage from "../../shared/assets/images/sample-profile.jpg";

const handleSearch = (query: string) => {
  console.log("Search query:", query);
};

const handleSort = (sortValue: string) => {
  console.log("Sort by:", sortValue);
};

const handleFilter = (filterValue: string) => {
  console.log("Filter by:", filterValue);
};

const [adminProfile, setAdminProfile] = useState({
  username: "Admin User",
  profileImage: sampleProfileImage,
});

function Message() {
  return (
    <div className="message-display">
      <PageHeading
        title="Message"
        subtitle="Review Flagged Messages and Address User Abuse"
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

export default Message;
