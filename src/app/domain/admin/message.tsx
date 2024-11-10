import React from "react";
import "./message.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import SearchBar from "../../shared/components/search-bar/search-bar";

const handleSearch = (query: string) => {
  console.log("Search query:", query);
  // Add logic to filter users based on the search query
};

const handleSort = (sortValue: string) => {
  console.log("Sort by:", sortValue);
  // Add logic to sort users based on the selected value
};

const handleFilter = (filterValue: string) => {
  console.log("Filter by:", filterValue);
  // Add logic to filter users based on the selected value
};

function Message() {
  return (
    <div className="message-display">
      <PageHeading
        title="Message"
        subtitle="Review Flagged Messages and Address User Abuse"
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
