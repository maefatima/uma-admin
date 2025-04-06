import React, { useState, useEffect } from "react";
import "./user-management.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import SearchBar from "../../shared/components/search-bar/search-bar";
import ViewUserModal from "../../shared/components/modals/view-user-modal";
import ConfirmUserStatus from "../../shared/components/modals/confirm-user-status";
import UserTable from "../../shared/components/table/table";
import placeholderProfileImage from "../../shared/assets/images/blank-profile.png";
import placeholderIdentificationCardImage from "../../shared/assets/images/id-sample2.jpg";
import axios from "axios";

interface User {
  key: number;
  id: number;
  username: string;
  contactNumber: string;
  email: string;
  address: string;
  gender?: string;
  birthdate?: string;
  profileImage?: string;
  identificationCardImage?: string;
  status: string;
}

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isViewModalVisible, setViewModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>(""); // e.g. "name_asc", "name_desc"
  const [filterStatus, setFilterStatus] = useState<string>(""); // e.g. "Approved"
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState<string | null>(null);

  const s3BaseUrl =
    "https://umarket-livestock-images.s3.ap-southeast-2.amazonaws.com";

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      const formattedUsers = response.data.map((user: any, index: number) => ({
        key: index + 1,
        id: user.id,
        username: `${user.first_name} ${user.last_name}`,
        contactNumber: user.phone_number || "N/A",
        email: user.email || "N/A",
        address:
          user.town && user.barangay
            ? `${user.barangay}, ${user.town}`
            : "Not provided",
        status: user.account_status || "Pending",
        profileImage: user.profile_image
          ? `${s3BaseUrl}/${user.profile_image}`
          : placeholderProfileImage,
        identificationCardImage: user.id_proof
          ? `${s3BaseUrl}/${user.id_proof}`
          : placeholderIdentificationCardImage,
        gender: user.gender || "Not provided",
        birthdate: user.birthdate || "Not provided",
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Use useEffect to fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const [adminProfile, setAdminProfile] = useState({
    username: "Loading...",
    profileImage: placeholderProfileImage,
  });

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const username = localStorage.getItem("adminUsername");
        if (!username) {
          console.error(
            "No username found in localStorage. Redirecting to login..."
          );
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/admin-accounts/profile`,
          {
            params: { username },
          }
        );

        setAdminProfile({
          username: response.data.username || "Unknown User",
          profileImage: response.data.profileImage
            ? `http://localhost:3000/${response.data.profileImage.replace(/\\/g, "/")}`
            : placeholderProfileImage,
        });
      } catch (err) {
        console.error("Error fetching admin profile:", err);
      }
    };
    fetchAdminProfile();
  }, []);

  const handleApproveUser = async (userId: number) => {
    console.log(`Attempting to approve user: ${userId}`);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/admin-accounts/approve-user/${userId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Approve API Response:", response);

      if (response.status === 200 || response.status === 201) {
        // Accept 201 as success
        console.log(`User ${userId} approved successfully.`);
        setSuccessModal(
          `✅ ${selectedUser?.username} has been approved successfully.`
        );

        // Close the modal immediately
        setIsConfirmModalOpen(false);
        setSelectedUser(null);

        // Refresh the user list from the backend to get the latest status
        await fetchUsers();
      } else {
        console.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error approving user ${userId}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectUser = async (userId: number) => {
    console.log(`Attempting to reject user: ${userId}`);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/admin-accounts/reject-user/${userId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Reject API Response:", response);

      if (response.status === 200 || response.status === 201) {
        // Accept 201 as success
        console.log(`User ${userId} rejected successfully.`);
        setSuccessModal(`⚠️ ${selectedUser?.username} has been rejected.`);

        // Close the modal immediately
        setIsConfirmModalOpen(false);
        setSelectedUser(null);

        // Refresh the user list from the backend to get the latest status
        await fetchUsers();
      } else {
        console.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error rejecting user ${userId}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (id: number) => {
    const user = users.find((user) => user.id === id) || null;
    setSelectedUser(user);
    setViewModalVisible(true);
  };

  const handleApproveRejectModal = (id: number) => {
    console.log(`Opening modal for user ID: ${id}`);
    const user = users.find((user) => user.id === id);
    if (user) {
      console.log("Selected user data:", user);
      setSelectedUser(user);
      setIsConfirmModalOpen(true);
    } else {
      console.error("User not found.");
    }
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.contactNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => (filterStatus ? user.status === filterStatus : true))
    .sort((a, b) => {
      if (sortBy === "name_asc") {
        return a.username.localeCompare(b.username);
      } else if (sortBy === "name_desc") {
        return b.username.localeCompare(a.username);
      }
      return 0;
    });

  return (
    <div className="user-display">
      <PageHeading
        title="User Management"
        subtitle="Manage System Users"
        profileImage={adminProfile.profileImage}
        username={adminProfile.username}
      />

      <div className="user-content">
        <div className="search">
          <SearchBar
            onSearch={(term) => setSearchTerm(term)}
            onSort={(value) => setSortBy(value)}
            onFilter={(value) => setFilterStatus(value)}
            sortOptions={[
              { label: "Name A-Z", value: "name_asc" },
              { label: "Name Z-A", value: "name_desc" },
            ]}
            filterOptions={[
              { label: "All", value: "" },
              { label: "Pending", value: "pending" },
              { label: "Approved", value: "approved" },
              { label: "Rejected", value: "rejected" },
            ]}
          />
        </div>
        <h2>User Accounts</h2>
        <UserTable
          users={filteredUsers.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )}
          totalUsers={users.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onView={handleView}
          onApproveReject={handleApproveRejectModal}
          tableType="userAccounts"
        />
      </div>

      {isConfirmModalOpen && selectedUser && (
        <ConfirmUserStatus
          isOpen={isConfirmModalOpen}
          message={`Approve or Reject ${selectedUser.username}'s account?`}
          onApprove={() => {
            console.log(`Approving user: ${selectedUser.id}`);
            handleApproveUser(selectedUser.id);
          }}
          onReject={() => {
            console.log(`Rejecting user: ${selectedUser.id}`);
            handleRejectUser(selectedUser.id);
          }}
          onCancel={() => {
            console.log("Closing modal without action.");
            setIsConfirmModalOpen(false);
          }}
        />
      )}

      {isViewModalVisible && selectedUser && (
        <ViewUserModal
          username={selectedUser.username}
          contactNumber={selectedUser.contactNumber}
          email={selectedUser.email}
          address={selectedUser.address}
          gender={selectedUser.gender || "Not provided"}
          birthdate={selectedUser.birthdate || "Not provided"}
          profileImage={selectedUser.profileImage || placeholderProfileImage}
          identificationCardImage={
            selectedUser.identificationCardImage ||
            placeholderIdentificationCardImage
          }
          onClose={() => setViewModalVisible(false)}
        />
      )}

      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Processing...</p>
        </div>
      )}

      {successModal && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <h3>Action Complete</h3>
            <p>{successModal}</p>
            <div className="modal-actions">
              <button
                className="confirm-btn"
                onClick={() => setSuccessModal(null)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
