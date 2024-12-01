import React, { useState } from "react";
import "./search-bar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSort: (sortValue: string) => void;
  onFilter: (filterValue: string) => void;
  sortOptions: { value: string; label: string }[];
  filterOptions: { value: string; label: string }[];
}

function SearchBar({
  onSearch,
  onSort,
  onFilter,
  sortOptions,
  filterOptions,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  }

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setSortValue(value);
    onSort(value);
  }

  function handleFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setFilterValue(value);
    onFilter(value);
  }

  return (
    <div className="search-bar-container">
      <div className="search-input-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="dropdown-container">
        <div className="sort-container">
          <div className="select-wrapper">
            <select id="sort-by" value={sortValue} onChange={handleSortChange}>
              <option value="">Sort By</option>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="separator"></div>
            <FontAwesomeIcon icon={faSort} className="icon-inside" />
          </div>
        </div>

        <div className="filter-container">
          <div className="select-wrapper">
            <select
              id="filter-by"
              value={filterValue}
              onChange={handleFilterChange}
            >
              <option value="">Filter By</option>
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="separator"></div>
            <FontAwesomeIcon icon={faFilter} className="icon-inside" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
