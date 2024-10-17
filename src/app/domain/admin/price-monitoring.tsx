import React from "react";
import "./price-monitoring.scss";
import PageHeading from "../../shared/components/heading/page-heading";

function PriceMonitoring() {
  return (
    <div className="price-display">
      <PageHeading
        title="Price Suggestion Monitoring"
        subtitle="Analyze and Track Suggested Price Changes"
      />
      <div className="price-content"></div>
    </div>
  );
}

export default PriceMonitoring;
