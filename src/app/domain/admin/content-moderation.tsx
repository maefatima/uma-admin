import React from "react";
import "./content-moderation.scss"; // Import a stylesheet for styling
import PageHeading from "../../shared/components/heading/page-heading";

function ContentModeration() {
  return (
    <div className="content-display">
      <PageHeading
        title="Content Moderation"
        subtitle="Manage User-Requested Livestock Postings and Educational Resources"
      />

      <div className="content-moderation-content"></div>
    </div>
  );
}

export default ContentModeration;
