import React, { useState } from "react";
import { Table, Pagination, Tooltip, Select } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import FlaggedModal from "../../components/modals/flagged-modal";
import "./report-table.scss";
import axios from "axios";

const { Option } = Select;

interface Report {
  key: number;
  id: number;
  reporter: {
    first_name: string;
    last_name: string;
  };
  reportedUser: {
    id: number;
    first_name: string;
    last_name: string;
    profile_image?: string;
  };
  reason: string;
  username: string;
  datereported: string;
  status: string;
  created_at: string;
}

interface ReportTableProps {
  reports: Report[];
  totalReports: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onView: (id: number) => void;
  onActionTaken: (
    reportId: number,
    action: string,
    disableDays?: number
  ) => void;
}

const ReportTable: React.FC<ReportTableProps> = ({
  reports,
  totalReports,
  pageSize,
  currentPage,
  onPageChange,
  onView,
  onActionTaken,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState<any>(null); // Store the modal data
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [notifyUser, setNotifyUser] = useState(false);
  const [disableDays, setDisableDays] = useState<number | undefined>(7);

  const handleOpenModal = async (record: Report) => {
    // ✅ Open the modal immediately with initial data
    setModalData(record);
    setIsModalVisible(true);

    if (!record.reportedUser?.id) {
      console.error("Reported user ID is missing:", record);
      return;
    }

    try {
      console.log(
        "Fetching profile for reported user:",
        record.reportedUser.id
      );

      // ✅ Fetch reported user’s profile using their ID
      const response = await axios.get(
        `http://localhost:3000/users/${record.reportedUser.id}`
      );

      console.log("Fetched reported user profile:", response.data);

      const reportedUserProfile = response.data;

      if (!reportedUserProfile.profile_image) {
        console.warn("No profile image found for user:", reportedUserProfile);
      }

      // ✅ Update modal data **after fetching the profile**
      setModalData((prevData: any) => ({
        ...prevData,
        reportedUser: {
          ...prevData.reportedUser,
          profile_image: reportedUserProfile.profile_image
            ? `http://localhost:3000/uploads/profile-images/${response.data.profile_image}`
            : "https://via.placeholder.com/50", // Default profile image
        },
      }));
    } catch (error) {
      console.error("Failed to fetch reported user's profile:", error);
    }
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

  const handleDisableDaysChange = (value: string) => {
    setDisableDays(parseInt(value, 10));
  };

  const handleNotifyChange = (checked: boolean) => {
    setNotifyUser(checked); // Update state when checkbox is clicked
  };

  const actionMap: Record<string, "warned" | "disabled" | "banned" | "none"> = {
    "Issue Warning": "warned",
    "Disable Account": "disabled",
    "Ban Account": "banned",
    "Dismiss Report": "none",
  };

  const handleSaveAction = async () => {
    if (!modalData || !selectedAction) return;

    try {
      const mappedAction = actionMap[selectedAction] || "none"; // ✅ Convert frontend action to backend enum

      await axios.post(
        `http://localhost:3000/admin-accounts/reports/action/${modalData.id}`,
        {
          action: mappedAction,
          disableDays: mappedAction === "disabled" ? disableDays : undefined,
        }
      );

      // onActionTaken(modalData.id, selectedAction, disableDays);
      onActionTaken(modalData.id, mappedAction);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update report:", error);
    }
  };

  const columns: ColumnsType<Report> = [
    { title: "ID", dataIndex: "id", key: "id", width: 60 },
    {
      title: "Reported User",
      key: "reportedUser",
      render: (_, record: Report) =>
        `${record.reportedUser.first_name} ${record.reportedUser.last_name}`,
    },
    {
      title: "Reporter",
      key: "reporter",
      render: (_, record: Report) =>
        `${record.reporter.first_name} ${record.reporter.last_name}`,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      width: 300,
    },
    {
      title: "Date Reported",
      dataIndex: "created_at",
      key: "created_at",
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
          username={`${modalData.reportedUser.first_name} ${modalData.reportedUser.last_name}`}
          reportedBy={`${modalData.reporter.first_name} ${modalData.reporter.last_name}`}
          reason={modalData.reason}
          actionOptions={[
            "Issue Warning",
            "Disable Account",
            "Ban Account",
            "Dismiss Report",
          ]}
          profileImage={modalData.reportedUser.profile_image}
          onClose={handleCloseModal}
          onSave={handleSaveAction}
          notifyUser={notifyUser}
          onNotifyChange={handleNotifyChange}
          onActionChange={handleActionChange} // Pass the handler to FlaggedModal
          selectedAction={selectedAction} // Pass the selected action as a prop
          disableDays={disableDays}
          onDisableDaysChange={handleDisableDaysChange}
        />
      )}
    </>
  );
};

export default ReportTable;
