import React from "react";
import "./content-moderation.scss"; // Import a stylesheet for styling
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

function ContentModeration() {
  return (
    <div className="content-display">
      <PageHeading
        title="Content Moderation"
        subtitle="Manage User-Requested Livestock Postings and Educational Resources"
      />

      <div className="content-moderation-content">
        <div className="search-content">
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

export default ContentModeration;
