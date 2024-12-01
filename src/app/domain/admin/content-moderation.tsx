import React, { useState } from "react";
import "./content-moderation.scss";
import PageHeading from "../../shared/components/heading/page-heading";
import SearchBar from "../../shared/components/search-bar/search-bar";
import Postings from "../../shared/components/table/content-postings";
import PostDetailsModal from "../../shared/components/modals/post-modal";
import img1 from "../../shared/assets/images/cow1.jpg";
import img2 from "../../shared/assets/images/cow2.jpg";
import sampleProfileImage from "../../shared/assets/images/sample-profile.jpg";

interface PostData {
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

const handleSearch = (query: string) => {
  console.log("Search query:", query);
};

const handleSort = (sortValue: string) => {
  console.log("Sort by:", sortValue);
};

const handleFilter = (filterValue: string) => {
  console.log("Filter by:", filterValue);
};

const imageUrls = [img1, img2];

function ContentModeration() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);

  const data: PostData[] = [
    {
      key: 1,
      postId: 111,
      username: "Mae Fatima C. Aladad",
      dateSubmitted: "November 3, 2024",
      imageUrls: imageUrls,
      description: "Kinsay nangita ug baka dira. Naa ko. Pm lang.",
      price: "PHP 40,000",
      livestockType: "Baka",
      quantity: 1,
      weight: "300 kg.",
    },
    {
      key: 2,
      postId: 222,
      username: "Michelle D. Bentulan",
      dateSubmitted: "November 6, 2024",
      description: "Another description here.",
      price: "PHP 50,000",
      livestockType: "Baka",
      quantity: 2,
      weight: "350 kg.",
      imageUrls: ["https://example.com/cow3.jpg"],
    },
  ];

  const [adminProfile, setAdminProfile] = useState({
    username: "Admin User",
    profileImage: sampleProfileImage,
  });

  const handleViewDetails = (record: PostData) => {
    setSelectedPost(record);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPost(null);
  };

  return (
    <div className="content-display">
      <PageHeading
        title="Content Moderation"
        subtitle="Manage Livestock Postings"
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

          <h2>Posting Moderation Table</h2>

          <Postings
            data={data}
            selectable={true}
            actionButtons={[
              {
                type: "view",
                onClick: handleViewDetails,
                visible: true,
              },
              {
                type: "delete",
                onClick: (record) => console.log("Delete", record),
                visible: true,
              },
            ]}
          />

          {selectedPost && (
            <PostDetailsModal
              isVisible={isModalVisible}
              onClose={handleCloseModal}
              imageUrls={selectedPost.imageUrls}
              description={selectedPost.description}
              price={selectedPost.price}
              livestockType={selectedPost.livestockType}
              quantity={selectedPost.quantity}
              weight={selectedPost.weight}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ContentModeration;
