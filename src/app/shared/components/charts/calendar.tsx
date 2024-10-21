import React, { useState } from "react";
import "./calendar.scss";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
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

  const years = Array.from(
    { length: 6 },
    (_, i) => currentDate.getFullYear() - 1 + i
  );

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];

    // Fill the empty slots before the first day
    for (
      let i = 0;
      i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
      i++
    ) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    // Fill actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === currentDate.getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();

      days.push(
        <div key={day} className={`calendar-day ${isToday ? "today" : ""}`}>
          {day}
        </div>
      );
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const selectMonth = (month: number) => {
    setCurrentDate(new Date(currentDate.setMonth(month)));
    setMonthDropdownOpen(false);
  };

  const selectYear = (year: number) => {
    setCurrentDate(new Date(currentDate.setFullYear(year)));
    setYearDropdownOpen(false);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="prev-month" onClick={handlePrevMonth}>
          &lt;
        </button>

        <div className="dropdown-container">
          <div
            className="dropdown month-dropdown"
            onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
          >
            {monthNames[currentDate.getMonth()]}
          </div>
          {monthDropdownOpen && (
            <div className="dropdown-menu">
              {monthNames.map((month, index) => (
                <div
                  key={index}
                  className={`dropdown-item ${index === currentDate.getMonth() ? "selected" : ""}`}
                  onClick={() => selectMonth(index)}
                >
                  {month}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dropdown-container">
          <div
            className="dropdown year-dropdown"
            onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
          >
            {currentDate.getFullYear()}
          </div>
          {yearDropdownOpen && (
            <div className="dropdown-menu">
              {years.map((year) => (
                <div
                  key={year}
                  className={`dropdown-item ${year === currentDate.getFullYear() ? "selected" : ""}`}
                  onClick={() => selectYear(year)}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="next-month" onClick={handleNextMonth}>
          &gt;
        </button>
      </div>

      <div className="calendar-grid">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="calendar-day-header">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
}

export default Calendar;
