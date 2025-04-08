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
import axios from "axios";

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

  // 🔥 **Fetch user registrations from backend**
  useEffect(() => {
    const fetchUserRegistrations = async () => {
      try {
        console.log(
          `Fetching user registrations for Month: ${month + 1}, Year: ${year}`
        );
        const response = await axios.get(
          `https://uma-backend-production-d139.up.railway.app/users/registrations?month=${month + 1}&year=${year}`
        );

        console.log("✅ API Response:", response.data);

        // Convert backend response into chart format
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const dataMap = new Map<number, number>();

        response.data.forEach((entry: { day: number; count: number }) => {
          dataMap.set(entry.day, entry.count);
        });

        const labels = Array.from({ length: daysInMonth }, (_, i) =>
          (i + 1).toString()
        );
        const data = labels.map((day) => dataMap.get(parseInt(day)) || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: "User Registrations",
              data,
              borderColor: "#32620e",
              backgroundColor: "rgba(184, 85, 76, 0.2)",
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("❌ Failed to fetch user registrations:", error);
      }
    };

    fetchUserRegistrations();
  }, [month, year]);

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
            {selectedDate
              ? `${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
              : "Select Date"}
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
