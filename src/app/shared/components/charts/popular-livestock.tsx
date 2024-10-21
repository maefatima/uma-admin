import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./popular-livestock.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart() {
  const data = {
    labels: ["Pig", "Cow", "Chicken"],
    datasets: [
      {
        label: "Popular Livestock",
        data: [3124213, 1523151, 948213],
        backgroundColor: ["#7459D9", "#8b77d5", "#bcb3dd"],
        hoverBackgroundColor: ["#7459D9", "#8b77d5", "#bcb3dd"],
        borderWidth: 1,
        cutout: "70%", // Makes the center hole bigger (for the donut effect)
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Hide default legend to use custom one
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="donut-chart-container">
      <div className="heading">
        <span className="header-icon">
          <h4>Popular Livestock</h4>
          <div className="tooltip-container">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="exclamation-point"
            />
            <span className="tooltip-text">
              This donut chart showcases the top three popular livestock
              listings, offering an insightful overview of their share in the
              marketplace.
            </span>
          </div>
        </span>
      </div>
      <div className="donut-legend">
        <div className="donut-chart">
          <Doughnut data={data} options={options} />
          <div className="center-label">
            <p className="total-count">5,824,213</p>
            <p className="label-text">Total Listings</p>
          </div>
        </div>
        <div className="custom-legend">
          <div className="legend-item pig">
            <span className="legend-color"></span>
            <div className="legend-text">
              <p className="livestock-name">Pig</p>
              <p className="livestock-label">3,124,213 listings</p>
            </div>
          </div>
          <div className="legend-item cow">
            <span className="legend-color"></span>
            <div className="legend-text">
              <p className="livestock-name">Cow</p>
              <p className="livestock-label">1,523,151 listings</p>
            </div>
          </div>
          <div className="legend-item chicken">
            <span className="legend-color"></span>
            <div className="legend-text">
              <p className="livestock-name">Chicken</p>
              <p className="livestock-label">948,213 listings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonutChart;
