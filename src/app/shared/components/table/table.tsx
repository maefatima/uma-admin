import React, { useState } from "react";
import { Table, Pagination, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons"; // For the icon
import ConfirmUserStatus from "../../components/modals/confirm-user-status"; // Confirm User Status Modal
import type { ColumnsType } from "antd/es/table";
import "./table.scss";

interface User {
  key: number;
  id: number;
  username: string;
  contactNumber: string;
  email: string;
  address: string;
  status: string; // Adding the status property to track Pending/Approved/Rejected
}

interface Report {
  key: number;
  id: number;
  username: string;
  dateReported: string;
  status: string;
}

interface UserTableBaseProps<T> {
  users: T[];
  totalUsers: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  tableType: string;
}

type UserTableProps =
  | (UserTableBaseProps<User> & {
      tableType: "userAccounts";
      onView: (id: number) => void;
      onFlag?: never;
    })
  | (UserTableBaseProps<Report> & {
      tableType: "reports";
      onFlag: (id: number) => void; // Passed function to handle flagged reports
      onView?: never;
    });

const UserTable: React.FC<UserTableProps> = ({
  users,
  totalUsers,
  pageSize = 10,
  currentPage,
  onPageChange,
  onView,
  tableType,
  onFlag, // Passed function for handling flagged reports
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [updatedUsers, setUpdatedUsers] = useState<User[]>(users as User[]); // Local state to manage the users list with updates
  const [updatedReports, setUpdatedReports] = useState<Report[]>(
    users as Report[]
  ); // Local state for reports

  const handleApprove = () => {
    if (selectedUser) {
      const updatedUserList = updatedUsers.map((user) =>
        user.id === selectedUser.id ? { ...user, status: "Approved" } : user
      );
      setUpdatedUsers(updatedUserList);
    }
    setIsConfirmModalOpen(false);
  };

  const handleReject = () => {
    if (selectedUser) {
      const updatedUserList = updatedUsers.map((user) =>
        user.id === selectedUser.id ? { ...user, status: "Rejected" } : user
      );
      setUpdatedUsers(updatedUserList);
    }
    setIsConfirmModalOpen(false);
  };

  const handleCancel = () => {
    setIsConfirmModalOpen(false);
  };

  const getButtonStyle = (status: string) => {
    switch (status) {
      case "Approved":
        return {
          backgroundColor: "#d4edda",
          color: "#155724",
          fontWeight: 500,
        };
      case "Rejected":
        return {
          backgroundColor: "#eab6b3",
          color: "#8d120d",
          fontWeight: 500,
        };
      case "Pending":
      default:
        return {
          backgroundColor: "#cfe2ff",
          color: "#084298",
          fontWeight: 500,
        };
    }
  };

  const columns: ColumnsType<any> =
    tableType === "userAccounts"
      ? [
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 60,
          },
          {
            title: "Username",
            dataIndex: "username",
            key: "username",
            width: 230,
            ellipsis: true,
          },
          {
            title: "Contact Number",
            dataIndex: "contactNumber",
            key: "contactNumber",
            width: 150,
            ellipsis: true,
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 230,
            ellipsis: true,
          },
          {
            title: "Address",
            dataIndex: "address",
            key: "address",
            width: 240,
            ellipsis: true,
          },

          {
            title: "Status",
            key: "status",
            width: 140,
            render: (_, record: User) => (
              <div className="status-buttons">
                <button
                  className="pending-button"
                  onClick={() => {
                    setSelectedUser(record); // Set selectedUser to the correct user
                    setIsConfirmModalOpen(true); // Show the modal for pending users
                  }}
                  style={getButtonStyle(record.status)} // Apply dynamic button style based on status
                >
                  {record.status === "Pending" ? "Pending" : record.status}
                </button>
              </div>
            ),
          },
          {
            title: "User Details",
            key: "userDetails",
            width: 110,
            render: (_, record: User) => (
              <Tooltip title="View User Details">
                <button className="icon" onClick={() => onView(record.id)}>
                  <InfoCircleOutlined />
                </button>
              </Tooltip>
            ),
          },
        ]
      : [
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 60,
          },
          {
            title: "Username",
            dataIndex: "username",
            key: "username",
            width: 230,
            ellipsis: true,
          },
          {
            title: "Date Reported",
            dataIndex: "dateReported",
            key: "dateReported",
            width: 150,
            ellipsis: true,
          },
          {
            title: "Status",
            key: "status",
            width: 120,
            render: (_, record: Report) => (
              <div
                className={`status-indicator ${
                  record.status === "Resolved" ? "resolved" : "pending"
                }`}
              >
                {record.status}
              </div>
            ),
          },
          {
            title: "Action",
            key: "action",
            width: 140,
            render: (_, record: Report) => (
              <div className="action-buttons">
                <button
                  className="review-button"
                  onClick={() => {
                    onFlag(record.id); // Trigger flagging action for reports
                  }}
                >
                  Review
                </button>
              </div>
            ),
          },
        ];

  return (
    <div className="user-table-container">
      <Table
        dataSource={updatedUsers} // Use updatedUsers for user accounts
        columns={columns}
        pagination={false}
        rowKey="key"
        rowClassName="custom-row"
        scroll={{ x: "max-content" }}
      />
      <div
        className="pagination-container"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <Pagination
          total={totalUsers}
          pageSize={pageSize}
          current={currentPage}
          onChange={onPageChange}
        />
      </div>

      {isConfirmModalOpen && selectedUser && (
        <ConfirmUserStatus
          isOpen={isConfirmModalOpen}
          message={`Do you want to Approve or Reject ${selectedUser.username}'s account?`}
          onApprove={handleApprove}
          onReject={handleReject}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default UserTable;
