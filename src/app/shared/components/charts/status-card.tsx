import React from "react";
import "./status-card.scss";

interface StatCardProps {
  className?: string; // Optional className prop
  icon?: React.ReactNode; // Optional prop for a custom icon
  title: string; // Prop for the title text
  count: number | string; // Prop for the count number
  iconBgColor?: string; // New prop for custom icon container background color
}

function StatCard({
  className = "",
  icon,
  title,
  count,
  iconBgColor,
}: StatCardProps) {
  return (
    <div className={`stat-card ${className}`}>
      <div
        className="icon-container"
        style={{ backgroundColor: iconBgColor || "#ffece4" }} // Use prop color or fallback
      >
        {icon}
      </div>
      <div className="stat-info">
        <p className="title">{title}</p>
        <p className="count">{count}</p>
      </div>
    </div>
  );
}

export default StatCard;
