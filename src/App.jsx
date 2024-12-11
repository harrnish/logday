import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./App.css";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayIndex = firstDay.getDay();

    return { daysInMonth, startingDayIndex };
  };

  const { daysInMonth, startingDayIndex } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatMonthYear = (date) => {
    const months = [
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
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth + startingDayIndex;
    const weeks = Math.ceil(totalDays / 7);

    for (let i = 0; i < weeks * 7; i++) {
      const dayNumber = i - startingDayIndex + 1;
      const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;

      days.push(
        <div
          key={i}
          className={`calendar-day ${isValidDay ? "valid-day" : "invalid-day"}`}
        >
          {isValidDay && <div className="day-number">{dayNumber}</div>}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="app">
      <div className="calendar-container">
        <div className="calendar-header">
          <button className="today-btn" onClick={goToToday}>
            Today
          </button>
          <div className="month-navigation">
            <h2>{formatMonthYear(currentDate)}</h2>
            <div className="nav-buttons">
              <button onClick={prevMonth}>
                <IoIosArrowBack />
              </button>
              <button onClick={nextMonth}>
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>

        <div className="calendar-grid">
          <div className="weekday-header">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="days-grid">{renderCalendarDays()}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
