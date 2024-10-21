import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import "./active-percentage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

// Online and Offline data as percentage of total users
const onlineUsers = 179;
const offlineUsers = 394;
const totalUsers = onlineUsers + offlineUsers; // Total users count

// Calculate percentages
const data = [
  {
    name: "Users",
    online: (onlineUsers / totalUsers) * 100, // Percentage of online users
    offline: (offlineUsers / totalUsers) * 100, // Percentage of offline users
  },
];

const ActivePercentageChart = () => {
  return (
    <div className="active-percentage-container">
      <div className="header">
        <span className="header-with-icon">
          <h4>Active Percentage</h4>
          <div className="container-tooltip">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="exclamation-icon"
            />
            <span className="tooltip-text">
              This active percentage chart reveals the proportion of active
              versus inactive users, offering a concise overview of user
              engagement on the platform.
            </span>
          </div>
        </span>
        <span>
          {totalUsers} <h5>Total</h5>
        </span>
      </div>

      {/* Recharts stacked bar to show Online and Offline in one bar */}
      <BarChart width={443} height={25} data={data} layout="vertical">
        <XAxis
          type="number"
          domain={[0, 100]}
          hide // Hide since the chart shows percentage
        />
        <YAxis
          type="category"
          dataKey="name"
          hide // Only one category, can be hidden
        />
        <Tooltip />
        <Bar
          className="barchart"
          dataKey="online"
          stackId="a"
          fill="#7E48D4"
          isAnimationActive={false}
        />
        <Bar
          className="barchart"
          dataKey="offline"
          stackId="a"
          fill="#E6D7FF"
          isAnimationActive={false}
        />
      </BarChart>

      <div className="user-info">
        <div className="user-status">
          <div className="legend">
            <span className="online-indicator"></span>
            <span>Online</span>
          </div>
          <span className="num-users">{onlineUsers} users</span>
        </div>

        <div className="user-status">
          <div className="legend">
            <span className="offline-indicator"></span>
            <span>Offline</span>
          </div>
          <span className="num-users">{offlineUsers} users</span>
        </div>
      </div>
    </div>
  );
};

export default ActivePercentageChart;
