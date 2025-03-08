import React, { useEffect, useState } from "react";
import "./report-management.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import SearchBar from "../../shared/components/search-bar/search-bar";
import ReportTable from "../../shared/components/table/report-table";
import placeholderProfileImage from "../../shared/assets/images/profile.jpg";
import axios from "axios";

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

function ReportManagement() {
  const [adminProfile, setAdminProfile] = useState({
    username: "Admin User",
    profileImage: placeholderProfileImage,
  });
  const [userCount, setUserCount] = useState(0);
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const username = localStorage.getItem("adminUsername");
        console.log(
          "Fetching admin profile for username from localStorage:",
          username
        );

        if (!username) {
          console.error(
            "No username found in localStorage. Redirecting to login..."
          );
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/admin-accounts/profile`,
          { params: { username } }
        );
        console.log("Profile data received from backend:", response.data);

        setAdminProfile({
          username: response.data.username || "Unknown User",
          profileImage: response.data.profileImage
            ? `http://localhost:3000/${response.data.profileImage.replace(
                /\\/g,
                "/"
              )}` // Prepend server URL and replace backslashes
            : placeholderProfileImage,
        });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error(
            "Axios error response:",
            err.response?.data || err.message
          );
        } else {
          console.error("Unexpected error:", err);
        }
      }
    };

    fetchAdminProfile();
  }, []);

  // const handleActionTaken = (reportId: number, action: string) => {
  //   setReports((prevReports) =>
  //     prevReports.map((report) =>
  //       report.id === reportId ? { ...report, status: action } : report
  //     )
  //   );
  // };

  const handleActionTaken = async (reportId: number, action: string) => {
    try {
      // Update the backend first
      await axios.post(
        `http://localhost:3000/admin-accounts/reports/action/${reportId}`,
        { action }
      );

      // Fetch the updated reports from the backend
      const response = await axios.get(
        "http://localhost:3000/admin-accounts/reports"
      );

      // Update the state with the new reports
      setReports(response.data);
    } catch (error) {
      console.error("Error updating report status:", error);
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin-accounts/reports"
        );
        const reportsWithKeys = response.data.map(
          (report: any, index: number) => ({
            ...report,
            key: index + 1, // Assign unique key
          })
        );
        setReports(reportsWithKeys);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const handleSort = (sortValue: string) => {
    console.log("Sort by:", sortValue);
  };

  const handleFilter = (filterValue: string) => {
    console.log("Filter by:", filterValue);
  };

  return (
    <div className="content-display">
      <PageHeading
        title="Report Management"
        subtitle="Manage User Reports and Issues"
        profileImage={adminProfile.profileImage}
        username={adminProfile.username}
      />

      <div className="content-moderation-content">
        <div className="search-content">
          <SearchBar
            onSearch={handleSearch}
            onSort={handleSort}
            onFilter={handleFilter}
            sortOptions={[
              { value: "name", label: "Name" },
              { value: "date", label: "Date" },
            ]}
            filterOptions={[{ value: "date", label: "Date" }]}
          />

          <h2>Reports</h2>

          <ReportTable
            reports={reports}
            totalReports={reports.length}
            pageSize={5}
            currentPage={1}
            onPageChange={(page: number) => console.log("Page changed:", page)}
            onView={(id: number) =>
              console.log("View details of post with ID", id)
            }
            // onActionTaken={(reportId: number, action: string, days?: number) =>
            //   console.log("Action taken:", reportId, action, days)
            // }
            onActionTaken={handleActionTaken}
          />
        </div>
      </div>
    </div>
  );
}

export default ReportManagement;
