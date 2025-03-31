import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./popular-livestock.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

ChartJS.register(ArcElement, Tooltip, Legend);

type DonutChartProps = {
  data?: { type: string; count: number }[];
  totalCount?: number;
};

const COLORS = ["#7459D9", "#8b77d5", "#bcb3dd"];

function DonutChart({ data = [], totalCount = 0 }: DonutChartProps) {
  console.log("🐞 DonutChart received data:", data);

  if (!Array.isArray(data)) {
    return <p>Invalid chart data</p>;
  }

  const labels = data.map(
    (item) => item.type.charAt(0).toUpperCase() + item.type.slice(1)
  );
  const counts = data.map((item) => item.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Popular Livestock",
        data: counts,
        backgroundColor: COLORS,
        hoverBackgroundColor: COLORS,
        borderWidth: 1,
        cutout: "70%",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="donut-chart-container">
      <div className="heading">
        <span className="header-icon">
          <h4>Top 3 Popular Livestock</h4>
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
          <Doughnut data={chartData} options={options} />
          <div className="center-label">
            <p className="total-count">{totalCount.toLocaleString()}</p>
            <p className="label-text">Total Sell Listings</p>
          </div>
        </div>

        <div className="custom-legend">
          {data.map((item, index) => (
            <div
              className={`legend-item ${item.type.toLowerCase()}`}
              key={item.type}
            >
              <span
                className="legend-color"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <div className="legend-text">
                <p className="livestock-name">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </p>
                <p className="livestock-label">
                  {item.count.toLocaleString()} listings
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DonutChart;
