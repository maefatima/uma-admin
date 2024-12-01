import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./user-registration.scss";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

Chart.register(...registerables);

Chart.defaults.font.family = "'Montserrat', sans-serif";
Chart.defaults.font.size = 14;
Chart.defaults.font.weight = "normal";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
  }[];
}

const UserRegistrationChart = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = monthNames.indexOf(e.target.value);
    if (newMonth >= 0) {
      setMonth(newMonth);
      const updatedDate = new Date(year, newMonth, 1);
      setSelectedDate(updatedDate);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = parseInt(e.target.value, 10);
    setYear(newYear);
    const updatedDate = new Date(newYear, month, selectedDate.getDate());
    setSelectedDate(updatedDate);
  };

  const generateChartData = (): ChartData => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return {
      labels: Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`),
      datasets: [
        {
          label: "User Registrations",
          data: Array.from({ length: daysInMonth }, () =>
            Math.floor(Math.random() * 100)
          ),
          borderColor: "#B8554C",
          backgroundColor: "rgba(184, 85, 76, 0.2)",
          borderWidth: 2,
        },
      ],
    };
  };

  useEffect(() => {
    const newChartData = generateChartData();
    setChartData(newChartData);
  }, [selectedDate]);

  return (
    <div className="user-registration-chart">
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
        <div className="chart-month-selector" onClick={toggleCalendar}>
          <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
          <span>
            {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
          </span>
        </div>
      </div>

      {isCalendarVisible && (
        <div className="calendar-container">
          <div className="date-inputs">
            <select value={monthNames[month]} onChange={handleMonthChange}>
              {monthNames.map((monthName, index) => (
                <option key={index} value={monthName}>
                  {monthName}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={year}
              onChange={handleYearChange}
              placeholder="Year"
            />
          </div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              if (date) {
                setSelectedDate(date);
                setMonth(date.getMonth());
                setYear(date.getFullYear());
                setIsCalendarVisible(false);
              }
            }}
            inline
          />
        </div>
      )}

      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              enabled: true,
              callbacks: {
                title: (context) => {
                  const day = context[0].label;
                  const fullDate = `${monthNames[month]} ${day}, ${year}`;
                  return fullDate;
                },
                label: (context) => `User Registrations: ${context.raw}`,
                labelColor: () => ({
                  backgroundColor: "transparent", // Hide the color legend box
                  borderColor: "transparent", // Hide the border color
                }),
                labelTextColor: () => "white", // Set tooltip text color
              },
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default UserRegistrationChart;
