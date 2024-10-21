import React, { useState } from "react";
import "./user-registration.scss";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker"; // Import the DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Import the DatePicker styles

// Register the necessary components for Chart.js
Chart.register(...registerables);

// Set global font defaults for the chart
Chart.defaults.font.family = "'Montserrat', sans-serif";
Chart.defaults.font.size = 14;
Chart.defaults.font.weight = "normal";

// Data for the user registration chart (Updated)
const data = {
  labels: ["1", "5", "10", "15", "20", "25", "30"], // Updated to reflect the X-axis like the image
  datasets: [
    {
      label: "User Registration",
      data: [4, 8, 5, 9, 14, 10, 12],
      borderColor: "#FF5D5D", // Red curve color
      fill: true,
      backgroundColor: "rgba(255, 93, 93, 0.1)", // Light red fill under the line
      tension: 0.4, // Smooth curve
      pointBackgroundColor: "#FF5D5D", // Red points
      pointBorderWidth: 2,
      pointHoverBorderWidth: 4,
    },
    {
      label: "Previous Month",
      data: [3, 5, 8, 7, 10, 6, 9],
      borderColor: "#D3D3D3", // Faded line color
      fill: true,
      backgroundColor: "rgba(211, 211, 211, 0.2)", // Light gray fill
      tension: 0.4, // Smooth curve
      pointRadius: 0, // No points for the faded line
    },
  ],
};

// Chart options (Updated to match the design)
const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false, // Hide vertical grid lines
      },
      ticks: {
        color: "#A8A8A8", // Light gray for x-axis text
        maxTicksLimit: 7,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(232, 232, 232, 0.7)", // Light gray grid lines
      },
      ticks: {
        color: "#A8A8A8", // Light gray for y-axis text
        stepSize: 5, // Set the step size to match the image
      },
    },
  },
  elements: {
    point: {
      radius: 6, // Point radius
      hoverRadius: 8, // On hover
    },
  },
  plugins: {
    legend: {
      display: false, // Hide legend
    },
    tooltip: {
      backgroundColor: "#FFFFFF",
      borderColor: "#FF5D5D", // Red tooltip border color
      borderWidth: 1,
      titleColor: "#6F6F6F", // Tooltip title color
      bodyColor: "#202020", // Tooltip body color
      padding: 10,
      caretPadding: 10,
      displayColors: false,
      callbacks: {
        title: (tooltipItems: any) => "This Month", // Custom title for tooltips
        label: (tooltipItem: any) => `${tooltipItem.raw} Registrations`, // Custom label in tooltip
      },
    },
  },
  maintainAspectRatio: false, // Allow chart to resize
};

function UserRegistrationChart() {
  const [showCalendar, setShowCalendar] = useState(false); // Manage calendar display state
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // Manage selected date

  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar); // Toggle calendar visibility
  };

  return (
    <div className="user-registration-chart">
      {/* Header section for the chart title and month */}
      <div className="chart-header">
        <div className="user-heading">
          <span className="user-header-icon">
            <h4>User Registration</h4>
            <div className="tooltip-container">
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="exclamation"
              />
              <span className="tooltip-text">
                The User Registration Line Chart provides a visual overview of
                user registrations throughout the month, highlighting trends and
                patterns in sign-ups over time.
              </span>
            </div>
          </span>
        </div>
        <div className="chart-month-selector" onClick={handleCalendarClick}>
          <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
          <span>
            {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
          </span>
        </div>
      </div>

      {/* Display calendar if showCalendar is true */}
      {showCalendar && (
        <>
          <div className="overlay" onClick={() => setShowCalendar(false)}></div>
          <div className="calendar-container">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              inline
            />
          </div>
        </>
      )}

      {/* Chart */}
      <Line data={data} options={options} />
    </div>
  );
}

export default UserRegistrationChart;
