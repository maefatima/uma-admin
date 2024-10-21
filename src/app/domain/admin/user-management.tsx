import React, { useState } from "react";
import "./user-management.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import SearchBar from "../../shared/components/search-bar/search-bar";
import UserTable from "../../shared/components/table/table";

function UserManagement() {
  const [users, setUsers] = useState([
    {
      key: 1,
      id: 111,
      username: "Mae Fatima Cabilan Aladad",
      contactNumber: "09635292636",
      email: "cheskacarlaanne.cabilan.noynay@bisu.edu.ph",
      address: "Tubigon",
      role: "Admin",
      status: "Active",
    },
    {
      key: 2,
      id: 222,
      username: "John Doe ABCDEFGHIJKLMNOPQRSTWXYZ",
      contactNumber: "09635292636",
      email: "aladadmaefatima.virtudazo@gmail.com",
      address: "Tubigon",
      role: "Admin",
      status: "Active",
    },
    // Add more users as needed
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Set your desired page size

  // Handler functions for SearchBar
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

  // Pagination handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Functions to handle actions in the Action column
  const handleEdit = (id: number) => {
    console.log("Edit user with ID:", id);
    // Add logic to edit the user
  };

  const handleFlag = (id: number) => {
    console.log("Flag user with ID:", id);
    // Add logic to flag the user
  };

  const handleDelete = (id: number) => {
    console.log("Delete user with ID:", id);
    // Add logic to delete the user
  };

  return (
    <div className="user-display">
      <PageHeading
        title="User Management"
        subtitle="Manage, Create, and Edit System Users"
      />

      <div className="user-content">
        <div className="search">
          <SearchBar
            onSearch={handleSearch}
            onSort={handleSort}
            onFilter={handleFilter}
          />
        </div>
        <h2>Account Management Table</h2>
        <UserTable
          users={users.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )} // Pass paginated user data
          totalUsers={users.length} // Set total users for pagination
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onEdit={handleEdit} // Pass the handleEdit function
          onFlag={handleFlag} // Pass the handleFlag function
          onDelete={handleDelete} // Pass the handleDelete function
        />
      </div>
    </div>
  );
}

export default UserManagement;
