import React from "react";
import { Table, Pagination, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  faListAlt,
  faFlag,
  faTrash,
  // faCheck,
  // faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./table.scss";

interface User {
  key: number;
  id: number;
  username: string;
  contactNumber: string;
  email: string;
  address: string;
  // verified: boolean; // True for verified, false for unverified
}

interface Report {
  key: number;
  id: number;
  username: string;
  dateReported: string;
  status: string; // "Pending" or "Resolved"
}

interface UserTableBaseProps<T> {
  users: T[];
  totalUsers: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onDelete: (id: number) => void;
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
      onFlag: (id: number) => void;
      onView?: never;
    });

const UserTable: React.FC<UserTableProps> = ({
  users,
  totalUsers,
  pageSize = 10,
  currentPage,
  onPageChange,
  onView,
  onFlag,
  onDelete,
  tableType,
}) => {
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
          // {
          //   title: "Verified",
          //   key: "verified",
          //   width: 120,
          //   render: (_, record: User) => (
          //     <div
          //       className={`verification-indicator ${
          //         record.verified ? "verified" : "unverified"
          //       }`}
          //     >
          //       {record.verified ? (
          //         <FontAwesomeIcon icon={faCheck} className="icon-check" />
          //       ) : (
          //         <FontAwesomeIcon icon={faTimes} className="icon-times" />
          //       )}
          //     </div>
          //   ),
          // },
          {
            title: "Action",
            key: "action",
            width: 140,
            render: (_, record: User) => (
              <div className="action-buttons">
                <Tooltip title="View Details">
                  <FontAwesomeIcon
                    icon={faListAlt}
                    onClick={() => onView(record.id)}
                    className="view-icon"
                  />
                </Tooltip>
                <Tooltip title="Delete">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => onDelete(record.id)}
                    className="delete-icon"
                  />
                </Tooltip>
              </div>
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
            width: 100,
            render: (_, record: Report) => (
              <div className="action-buttons">
                <Tooltip title="Flag">
                  <FontAwesomeIcon
                    icon={faFlag}
                    onClick={() => onFlag(record.id)}
                    className="flagged-icon"
                  />
                </Tooltip>
                <Tooltip title="Delete">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => onDelete(record.id)}
                    className="delete-icon"
                  />
                </Tooltip>
              </div>
            ),
          },
        ];

  return (
    <div className="user-table-container">
      <Table
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
          pageSize={pageSize}
          current={currentPage}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default UserTable;
