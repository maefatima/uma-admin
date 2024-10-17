import React from "react";
import "./message.scss";
import PageHeading from "../../shared/components/heading/page-heading";

function Message() {
  return (
    <div className="message-display">
      <PageHeading
        title="Message"
        subtitle="Review Flagged Messages and Address User Abuse"
      />
      <div className="message-content"></div>
    </div>
  );
}

export default Message;
