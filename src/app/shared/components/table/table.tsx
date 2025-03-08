import React from "react";
import { Table, Pagination, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import "./table.scss";

interface User {
  key: number;
  id: number;
  username: string;
  contactNumber: string;
  email: string;
  address: string;
  status: string;
}

interface UserTableProps {
  users: User[];
  totalUsers: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onView: (id: number) => void;
  onApproveReject: (id: number) => void;
  tableType: string; // ✅ Add this line
}

const getButtonStyle = (status: string) => {
  switch (status) {
    case "approved":
      return {
        backgroundColor: "#d4edda",
        color: "#155724",
        fontWeight: 500,
        borderRadius: "8px",
        padding: "6px 12px",
        border: "none",
        cursor: "pointer",
      };
    case "rejected":
      return {
        backgroundColor: "#eab6b3",
        color: "#8d120d",
        fontWeight: 500,
        borderRadius: "8px",
        padding: "6px 12px",
        border: "none",
        cursor: "pointer",
      };
    case "pending":
    default:
      return {
        backgroundColor: "#cfe2ff",
        color: "#084298",
        fontWeight: 500,
        borderRadius: "8px",
        padding: "6px 12px",
        border: "none",
        cursor: "pointer",
      };
  }
};

const UserTable: React.FC<UserTableProps> = ({
  users,
  totalUsers,
  pageSize,
  currentPage,
  onPageChange,
  onView,
  onApproveReject,
  tableType,
}) => {
  const columns: ColumnsType<User> = [
    { title: "ID", dataIndex: "id", key: "id", width: 80 },
    { title: "Username", dataIndex: "username", key: "username", width: 210 },
    {
      title: "Contact",
      dataIndex: "contactNumber",
      key: "contactNumber",
      width: 150,
    },
    { title: "Email", dataIndex: "email", key: "email", width: 230 },
    { title: "Address", dataIndex: "address", key: "address", width: 260 },
    {
      title: "Status",
      key: "status",
      width: 110,
      render: (_, record: User) => (
        <div className="status-buttons">
          <button
            className="pending-button"
            onClick={() => {
              console.log(
                `Opening approval/rejection modal for user ${record.id}`
              );
              onApproveReject(record.id);
            }}
            style={getButtonStyle(record.status)}
          >
            {record.status}
          </button>
        </div>
      ),
    },
    {
      title: "Details",
      key: "details",
      width: 80,
      render: (_, record) => (
        <Tooltip title="View Details">
          <InfoCircleOutlined onClick={() => onView(record.id)} />
        </Tooltip>
      ),
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      pagination={{
        total: totalUsers,
        pageSize,
        current: currentPage,
        onChange: onPageChange,
        showSizeChanger: false,
        style: {
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        },
      }}
    />
  );
};

export default UserTable;
