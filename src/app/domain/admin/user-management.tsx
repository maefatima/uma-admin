import React, { useState } from "react";
import "./user-management.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import SearchBar from "../../shared/components/search-bar/search-bar";
import UserTable from "../../shared/components/table/table";
import ViewUserModal from "../../shared/components/modals/view-user-modal";
import sampleProfileImage from "../../shared/assets/images/sample-profile.jpg";
import FlaggedModal from "../../shared/components/modals/flagged-modal";

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
  const [isViewModalVisible, setViewModalVisible] = useState(false);
  const [isFlaggedModalVisible, setFlaggedModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [notifyUser, setNotifyUser] = useState(false);
  const [action, setAction] = useState("Action"); // Initialize action dropdown with "Action"
  const pageSize = 10;

  const handleView = (id: number) => {
    const user = users.find((user) => user.id === id) || null;
    setSelectedUser(user);
    setViewModalVisible(true);
    setFlaggedModalVisible(false);
  };

  const handleFlag = (id: number) => {
    const user = users.find((user) => user.id === id) || null;
    setSelectedUser(user);
    setFlaggedModalVisible(true);
    setViewModalVisible(false);
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

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  // const handleDelete = (id: number) => {
  //   console.log("Delete user with ID:", id);
  // };

  const handleCloseModal = () => {
    setViewModalVisible(false);
    setFlaggedModalVisible(false);
    setSelectedUser(null);
    resetModalState(); // Reset checkbox and action dropdown
  };

  const handleSave = () => {
    console.log("Flagged user action saved");
    setFlaggedModalVisible(false);
    resetModalState();
  };

  const resetModalState = () => {
    setNotifyUser(false); // Clear checkbox
    setAction("Action"); // Reset dropdown to default
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
            filterOptions={[{ value: "user", label: "User" }]}
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
            onPageChange={setCurrentPage}
            onView={handleView}
            onFlag={handleFlag}
            onDelete={(id) => console.log("Delete user with ID:", id)}
          />
        </div>
      </div>

      {isViewModalVisible && selectedUser && (
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

      {isFlaggedModalVisible && selectedUser && (
        <FlaggedModal
          username={selectedUser.username}
          reportedBy="Michelle Bentulan"
          reason="Pretending to be someone"
          actionOptions={[
            "Action",
            "Mark as Reviewed",
            "Issue Warning",
            "Suspend Account",
            "Dismiss Report",
          ]}
          notifyUser={notifyUser}
          profileImage={selectedUser.profileImage || sampleProfileImage}
          onClose={handleCloseModal}
          onSave={handleSave}
          onNotifyChange={setNotifyUser}
          onActionChange={setAction}
          selectedAction={action} // Pass current action
        />
      )}
    </div>
  );
}

export default UserManagement;
