import React from "react";
import { Table, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./livestock-table.scss";

interface LivestockData {
  key: number;
  livestockType: string;
  price: number; // Price Per Kilogram
  date: string;
}

interface LivestockTableProps {
  data: LivestockData[];
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number, pageSize?: number) => void;
  titleColor?: string;
  headerBgColor?: string;
}

const LivestockTable: React.FC<LivestockTableProps> = ({
  data,
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
  titleColor = "black",
  headerBgColor = "#f5f5f5",
}) => {
  const columns: ColumnsType<LivestockData> = [
    {
      title: "Livestock Type",
      dataIndex: "livestockType",
      key: "livestockType",
    },
    { title: "Price Per Kilogram", dataIndex: "price", key: "price" },
    { title: "Date Set", dataIndex: "date", key: "date" },
  ];

  const components = {
    header: {
      cell: (props: any) => (
        <th
          {...props}
          style={{ ...props.style, backgroundColor: headerBgColor }}
        />
      ),
    },
  };

  return (
    <div className="livestock-table-container">
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey="key"
        scroll={{ x: "max-content" }}
        components={components}
      />
      <Pagination
        total={totalItems}
        pageSize={pageSize}
        current={currentPage}
        onChange={onPageChange}
        style={{ marginTop: 16, textAlign: "center" }}
      />
    </div>
  );
};

export default LivestockTable;
