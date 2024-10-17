import React from "react";
import "./user-registration.scss";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Register the necessary components
Chart.register(...registerables);

// Set global font for Chart.js
Chart.defaults.font.family = "'Montserrat', sans-serif"; // Global font family
Chart.defaults.font.size = 14; // Default font size (optional)
Chart.defaults.font.weight = "normal"; // Default font weight (optional)

// Data for the chart
const data = {
  labels: ["1", "5", "10", "15", "20"],
  datasets: [
    {
      label: "User Registration",
      data: [2, 6, 9, 7, 8],
      borderColor: "red",
      fill: false,
      tension: 0.4,
    },
  ],
};

// Options for the chart
const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  maintainAspectRatio: false, // This ensures the chart uses the container's size
};

function UserRegistrationChart() {
  return (
    <div className="user-registration-chart">
      {/* Set explicit width and height inline or via SCSS */}
      <Line data={data} options={options} />
    </div>
  );
}

export default UserRegistrationChart;
