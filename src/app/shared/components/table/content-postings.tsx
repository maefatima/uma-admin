import React, { useState } from "react";
import { Table, Checkbox, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faListAlt } from "@fortawesome/free-solid-svg-icons";
import "./content-postings.scss";

interface ContentPostings {
  key: number;
  postId: number;
  username: string;
  dateSubmitted: string;
  description: string;
  price: string;
  livestockType: string;
  quantity: number;
  weight: string;
  imageUrls: string[];
}

interface ContentPostingsProps {
  data: ContentPostings[];
  selectable?: boolean;
  actionButtons?: {
    type: "view" | "delete";
    onClick: (record: ContentPostings) => void;
    visible?: boolean;
  }[];
}

function Postings({ data, selectable, actionButtons }: ContentPostingsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const columns: ColumnsType<ContentPostings> = [
    {
      title: "Post ID",
      dataIndex: "postId",
      key: "postId",
      width: 110,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: 300,
      ellipsis: true,
    },
    {
      title: "Date Submitted",
      dataIndex: "dateSubmitted",
      key: "dateSubmitted",
      width: 200,
      ellipsis: true,
    },

    actionButtons && actionButtons.length > 0
      ? {
          title: "Action",
          key: "action",
          render: (_: any, record: ContentPostings) => (
            <div className="action-buttons">
              {actionButtons.map((button, index) => {
                if (button.visible === false) return null;
                const icon = button.type === "view" ? faListAlt : faTrash;
                return (
                  <FontAwesomeIcon
                    key={index}
                    icon={icon}
                    onClick={() => button.onClick(record)}
                    className={
                      button.type === "delete" ? "delete-icon" : "view-icon"
                    }
                  />
                );
              })}
            </div>
          ),
          width: 150,
        }
      : null,
  ].filter(Boolean) as ColumnsType<ContentPostings>;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="content-table-container">
      <Table<ContentPostings>
        dataSource={paginatedData}
        columns={columns}
        pagination={false}
        rowKey="key"
        rowClassName="custom-row"
      />
      <div
        className="pagination-container"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Postings;
