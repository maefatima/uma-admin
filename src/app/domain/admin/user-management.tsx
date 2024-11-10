import React, { useState } from "react";
import "./user-management.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import SearchBar from "../../shared/components/search-bar/search-bar";
import UserTable from "../../shared/components/table/table";
import ViewUserModal from "../../shared/components/modals/view-user-modal";
import sampleProfileImage from "../../shared/assets/images/sample-profile.jpg";

interface User {
  key: number;
  id: number;
  username: string;
  contactNumber: string;
  email: string;
  address: string;
  gender?: string; // Optional fields if they are not always present
  birthdate?: string;
  profileImage?: string;
}

function UserManagement() {
  const [users, setUsers] = useState([
    {
      key: 1,
      id: 111,
      username: "Mae Fatima Cabilan Aladad",
      contactNumber: "09635292636",
      email: "cheskacarlaanne.cabilan.noynay@bisu.edu.ph",
      address: "Tubigon",
    },
    // Add more users as needed
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const pageSize = 10; // Set your desired page size

  const handleView = (id: number) => {
    const user = users.find((user) => user.id === id) || null; // Find the user by ID or default to null
    setSelectedUser(user); // Set the selected user data
    setModalVisible(true); // Show the modal
  };

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const handleSort = (sortValue: string) => {
    console.log("Sort by:", sortValue);
  };

  const handleFilter = (filterValue: string) => {
    console.log("Filter by:", filterValue);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFlag = (id: number) => {
    console.log("Flag user with ID:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete user with ID:", id);
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Hide the modal
    setSelectedUser(null); // Clear the selected user data
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
            sortOptions={[
              { value: "name", label: "Name" },
              { value: "date", label: "Date" },
              { value: "address", label: "Address" },
            ]}
            filterOptions={[
              { value: "admin", label: "Admin" },
              { value: "user", label: "User" },
            ]}
          />
        </div>
        <div className="table">
          <h2>Account Management Table</h2>

          <UserTable
            users={users.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )}
            totalUsers={users.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onView={handleView}
            onFlag={handleFlag}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {isModalVisible && selectedUser && (
        <ViewUserModal
          username={selectedUser.username}
          contactNumber={selectedUser.contactNumber}
          email={selectedUser.email}
          address={selectedUser.address}
          gender={selectedUser.gender || "Female"}
          birthdate={selectedUser.birthdate || "July 2, 2003"}
          profileImage={selectedUser.profileImage || sampleProfileImage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default UserManagement;
