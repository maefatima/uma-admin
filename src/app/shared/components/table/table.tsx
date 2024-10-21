import React from "react";
import { Table, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFlag, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./table.scss";

interface User {
  key: number;
  id: number;
  username: string;
  contactNumber: string;
  email: string;
  address: string;
  role: string;
  status: string;
}

interface UserTableProps {
  users: User[];
  totalUsers: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number, pageSize?: number) => void;
  onEdit: (id: number) => void;
  onFlag: (id: number) => void;
  onDelete: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  totalUsers,
  pageSize,
  currentPage,
  onPageChange,
  onEdit,
  onFlag,
  onDelete,
}) => {
  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
      fixed: "left",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: 260,
      ellipsis: true, // Truncate long usernames
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
      width: 150,
      ellipsis: true, // Truncate long contact numbers
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 230,
      ellipsis: true, // Truncate long emails
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 240,
      ellipsis: true, // Truncate long addresses
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 90,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 90,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record: User) => (
        <div className="action-buttons">
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => onEdit(record.id)}
            className="edit-icon"
          />
          <FontAwesomeIcon
            icon={faFlag}
            onClick={() => onFlag(record.id)}
            className="flagged-icon"
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => onDelete(record.id)}
            className="delete-icon"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="user-table-container">
      <div className="table">
        <Table<User>
          dataSource={users}
          columns={columns}
          pagination={false}
          rowKey="key"
          rowClassName="custom-row"
          scroll={{ x: "max-content" }} // Allow horizontal scrolling
        />
      </div>
      <Pagination
        total={totalUsers}
        pageSize={pageSize}
        current={currentPage}
        onChange={onPageChange}
        style={{
          marginTop: 16,
          textAlign: "center",
        }}
      />
    </div>
  );
};

export default UserTable;
