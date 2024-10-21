import React from "react";
import "./price-monitoring.scss";
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

function PriceMonitoring() {
  return (
    <div className="price-display">
      <PageHeading
        title="Price Suggestion Monitoring"
        subtitle="Analyze and Track Suggested Price Changes"
      />
      <div className="price-content">
        <div className="search-price">
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

export default PriceMonitoring;
