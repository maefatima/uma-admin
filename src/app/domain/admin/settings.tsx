import React from "react";
import "./settings.scss";
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

function Settings() {
  return (
    <div className="settings-display">
      <PageHeading
        title="Settings"
        subtitle="Configure System Preferences and User Options"
      />
      <div className="settings-content">
        <div className="search-settings">
          <SearchBar
            onSearch={handleSearch}
            onSort={handleSort}
            onFilter={handleFilter}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
