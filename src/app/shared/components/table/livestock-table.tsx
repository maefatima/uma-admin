import React from "react";
import { Table, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./livestock-table.scss";

interface LivestockData {
  key: number;
  livestockType: string;
  weight: number;
  price: number;
  date: string; // Added date field
}

interface LivestockTableProps {
  data: LivestockData[];
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number, pageSize?: number) => void;
  titleColor?: string; // Color for table title
  headerBgColor?: string; // Color for table header row
}

const LivestockTable: React.FC<LivestockTableProps> = ({
  data,
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
  titleColor = "black", // Default title color if not provided
  headerBgColor = "#f5f5f5", // Default header background color if not provided
}) => {
  const columns: ColumnsType<LivestockData> = [
    {
      title: "Livestock Type",
      dataIndex: "livestockType",
      key: "livestockType",
    },
    { title: "Weight", dataIndex: "weight", key: "weight" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Date Set", dataIndex: "date", key: "date" },
  ];

  // Define the custom header cell
  const components = {
    header: {
      cell: ({
        style,
        ...restProps
      }: {
        style?: React.CSSProperties;
        [key: string]: any;
      }) => (
        <th
          {...restProps}
          style={{
            ...style,
            backgroundColor: headerBgColor, // Apply header background color
          }}
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
