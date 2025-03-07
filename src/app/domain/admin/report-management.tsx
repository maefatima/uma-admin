import React, { useState } from "react";
import "./report-management.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import SearchBar from "../../shared/components/search-bar/search-bar";
import ReportTable from "../../shared/components/table/report-table";
import sampleProfileImage from "../../shared/assets/images/sample-profile.jpg";

const handleSearch = (query: string) => {
  console.log("Search query:", query);
};

const handleSort = (sortValue: string) => {
  console.log("Sort by:", sortValue);
};

const handleFilter = (filterValue: string) => {
  console.log("Filter by:", filterValue);
};

function ReportManagement() {
  const [adminProfile, setAdminProfile] = useState({
    username: "Admin User",
    profileImage: sampleProfileImage,
  });

  const data = [
    {
      key: 1,
      id: 111,
      username: "Mae Fatima C. Aladad",
      datereported: "November 3, 2024",
      status: "pending",
    },
    {
      key: 2,
      id: 222,
      username: "Michelle D. Bentulan",
      datereported: "November 6, 2024",
      status: "resolved",
    },
  ];

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
            reports={data}
            totalReports={data.length}
            pageSize={5}
            currentPage={1}
            onPageChange={(page: number) => console.log("Page changed:", page)}
            onView={(id: number) =>
              console.log("View details of post with ID", id)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ReportManagement;
