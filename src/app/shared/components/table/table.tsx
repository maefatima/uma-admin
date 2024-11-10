import React from "react";
import { Table, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt, faFlag, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./table.scss";

interface User {
  key: number;
  id: number;
  username: string;
  contactNumber: string;
  email: string;
  address: string;
}

interface UserTableProps {
  users: User[];
  totalUsers: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onView: (id: number) => void;
  onFlag: (id: number) => void;
  onDelete: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  totalUsers,
  pageSize = 10,
  currentPage,
  onPageChange,
  onView,
  onFlag,
  onDelete,
}) => {
  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
      fixed: "left",
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
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record: User) => (
        <div className="action-buttons">
          <FontAwesomeIcon
            icon={faListAlt}
            onClick={() => onView(record.id)}
            className="view-icon"
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
      <Table<User>
        dataSource={users}
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
          pageSize={10}
          current={currentPage}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default UserTable;
