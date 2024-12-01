import React, { useState } from "react";
import "./user-management.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import SearchBar from "../../shared/components/search-bar/search-bar";
import ViewUserModal from "../../shared/components/modals/view-user-modal";
import sampleProfileImage from "../../shared/assets/images/sample-profile.jpg";
import FlaggedModal from "../../shared/components/modals/flagged-modal";
import { Tabs } from "antd";
import UserTable from "../../shared/components/table/table";

interface User {
  key: number;
  id: number;
  username: string;
  contactNumber: string;
  email: string;
  address: string;
  // verified: boolean; // true for verified, false for unverified
  gender?: string; // Optional field
  birthdate?: string; // Optional field
  profileImage?: string; // Optional field
}

interface Report {
  key: number;
  id: number;
  username: string;
  dateReported: string;
  status: string;
}

function UserManagement() {
  type TabKey = "userAccounts" | "reports";

  const [users] = useState<User[]>([
    {
      key: 1,
      id: 111,
      username: "Mae Fatima Cabilan Aladad",
      contactNumber: "09635292636",
      email: "maefatima.aladad@bisu.edu.ph",
      address: "Panadtaran, Tubigon, Bohol",
    },
    {
      key: 2,
      id: 112,
      username: "Michelle Dupa Bentulan",
      contactNumber: "09055885742",
      email: "michelle.bentulan@bisu.edu.ph",
      address: "Ilijan Norte, Tubigon, Bohol",
    },
  ]);

  const [reports] = useState<Report[]>([
    {
      key: 1,
      id: 201,
      username: "John Doe",
      dateReported: "2024-11-25",
      status: "Pending",
    },
    {
      key: 2,
      id: 202,
      username: "Jane Smith",
      dateReported: "2024-11-26",
      status: "Resolved",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isViewModalVisible, setViewModalVisible] = useState(false);
  const [isFlaggedModalVisible, setFlaggedModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("userAccounts");
  const pageSize = 10;

  const [adminProfile, setAdminProfile] = useState({
    username: "Admin User", // Placeholder username
    profileImage: sampleProfileImage, // Placeholder profile image
  });

  const handleTabChange = (key: string) => {
    setActiveTab(key === "1" ? "userAccounts" : "reports");
    setCurrentPage(1);
  };

  const sortOptions: Record<TabKey, { value: string; label: string }[]> = {
    userAccounts: [
      { value: "name", label: "Name" },
      { value: "address", label: "Address" },
    ],
    reports: [
      { value: "dateReported", label: "Date Reported" },
      { value: "status", label: "Status" },
    ],
  };

  const filterOptions: Record<TabKey, { value: string; label: string }[]> = {
    userAccounts: [
      { value: "id", label: "ID" },
      // { value: "unverified", label: "Unverified" },
    ],
    reports: [
      { value: "pending", label: "Pending" },
      { value: "resolved", label: "Resolved" },
    ],
  };

  const handleView = (id: number) => {
    const user = users.find((user) => user.id === id) || null;
    setSelectedReport(null);
    setSelectedUser(user);
    setViewModalVisible(true);
    setFlaggedModalVisible(false);
  };

  const handleFlag = (id: number) => {
    const report = reports.find((report) => report.id === id) || null;
    setSelectedUser(null);
    setSelectedReport(report);
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

  const handleCloseModal = () => {
    setViewModalVisible(false);
    setFlaggedModalVisible(false);
    setSelectedUser(null);
    setSelectedReport(null);
  };

  return (
    <div className="user-display">
      <PageHeading
        title="User Management"
        subtitle="Manage System Users"
        profileImage={adminProfile.profileImage} // Pass admin profile image
        username={adminProfile.username} // Pass admin username
      />

      <div className="user-content">
        <div className="search">
          <SearchBar
            onSearch={handleSearch}
            onSort={handleSort}
            onFilter={handleFilter}
            sortOptions={sortOptions[activeTab]} // Dynamic sort options
            filterOptions={filterOptions[activeTab]} // Dynamic filter options
          />
        </div>
        <Tabs defaultActiveKey="1" onChange={handleTabChange}>
          <Tabs.TabPane tab="User Accounts" key="1">
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
                onDelete={(id) => console.log("Delete user with ID:", id)}
                tableType="userAccounts"
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Reports" key="2">
            <div className="table">
              <h2>Reports Table</h2>
              <UserTable
                users={reports.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )}
                totalUsers={reports.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onFlag={handleFlag}
                onDelete={(id) => console.log("Delete report with ID:", id)}
                tableType="reports"
              />
            </div>
          </Tabs.TabPane>
        </Tabs>
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

      {isFlaggedModalVisible && selectedReport && (
        <FlaggedModal
          username={selectedReport.username}
          reportedBy="System Admin"
          reason="Reported for review"
          actionOptions={[
            "Action",
            "Mark as Reviewed",
            "Disable Account",
            "Ban Account",
            "Dismiss Report",
          ]}
          notifyUser={false}
          profileImage={sampleProfileImage}
          onClose={handleCloseModal}
          onSave={() => console.log("Save Flag Action")}
          onNotifyChange={() => {}}
          onActionChange={() => {}}
          selectedAction="Action"
        />
      )}
    </div>
  );
}

export default UserManagement;
