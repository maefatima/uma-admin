import React, { useState } from "react";
import { Table, Pagination, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import FlaggedModal from "../../components/modals/flagged-modal";
import "./report-table.scss";

interface Report {
  key: number;
  id: number;
  username: string;
  datereported: string;
  status: string;
}

interface ReportTableProps {
  reports: Report[];
  totalReports: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onView: (id: number) => void;
}

const ReportTable: React.FC<ReportTableProps> = ({
  reports,
  totalReports,
  pageSize,
  currentPage,
  onPageChange,
  onView,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState<any>(null); // Store the modal data
  const [selectedAction, setSelectedAction] = useState("");
  const [notifyUser, setNotifyUser] = useState(false);

  const handleOpenModal = (record: Report) => {
    setModalData(record);
    setIsModalVisible(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Close the modal
    setModalData(null); // Clear the data
    setNotifyUser(false);
    setSelectedAction("");
  };

  const handleActionChange = (action: string) => {
    setSelectedAction(action); // Update the selected action state
    console.log("Selected Action:", action);
  };

  const handleNotifyChange = (checked: boolean) => {
    setNotifyUser(checked); // Update state when checkbox is clicked
  };

  const columns: ColumnsType<Report> = [
    { title: "ID", dataIndex: "id", key: "id", width: 60 },
    { title: "Username", dataIndex: "username", key: "username", width: 300 },
    {
      title: "Date Reported",
      dataIndex: "datereported",
      key: "datereported",
      width: 200,
    },
    {
      title: "Status",
      key: "status",
      width: 150,
      render: (_, record: Report) => (
        <div
          className={`status-color-indicator ${
            record.status.toLowerCase() === "resolved" ? "resolved" : "pending"
          }`}
        >
          {record.status}
        </div>
      ),
    },
    {
      title: "Details",
      key: "details",
      width: 100,
      render: (_, record) => (
        <Tooltip title="View Details">
          <InfoCircleOutlined onClick={() => handleOpenModal(record)} />
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={reports}
        columns={columns}
        pagination={{
          total: totalReports,
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

      {/* Conditionally render the FlaggedModal when the modal is visible */}
      {isModalVisible && modalData && (
        <FlaggedModal
          username={modalData.username}
          reportedBy="Admin"
          reason="Inappropriate content"
          actionOptions={[
            "Mark as Reviewed",
            "Issue Warning",
            "Suspend Account",
            "Ban Account",
            "Dismiss Report",
          ]}
          profileImage="path/to/profile-image.jpg"
          onClose={handleCloseModal}
          onSave={() => console.log("Save action")}
          notifyUser={notifyUser}
          onNotifyChange={handleNotifyChange}
          onActionChange={handleActionChange} // Pass the handler to FlaggedModal
          selectedAction={selectedAction} // Pass the selected action as a prop
        />
      )}
    </>
  );
};

export default ReportTable;
