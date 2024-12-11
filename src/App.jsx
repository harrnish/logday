import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./App.css";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [pnlData, setPnlData] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [pnlValue, setPnlValue] = useState("");
  const [tradeType, setTradeType] = useState("hit");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSubmit = () => {
    if (selectedDate && pnlValue) {
      setPnlData({
        ...pnlData,
        [selectedDate]: {
          value: parseFloat(pnlValue),
          type: tradeType,
        },
      });
      setSelectedDate("");
      setPnlValue("");
      setTradeType("hit");
      setIsModalOpen(false);
    }
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

      const currentYear = currentDate.getFullYear();
      const currentMonth = (currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const currentDay = dayNumber.toString().padStart(2, "0");
      const dateString = `${currentYear}-${currentMonth}-${currentDay}`;

      const pnlInfo = pnlData[dateString];

      days.push(
        <div
          key={i}
          className={`calendar-day ${isValidDay ? "valid-day" : "invalid-day"} 
                     ${
                       pnlInfo
                         ? pnlInfo.type === "hit"
                           ? "hit-day"
                           : "miss-day"
                         : ""
                     }`}
        >
          {isValidDay && (
            <div className="day-content">
              <div className="day-number">{dayNumber}</div>
              {pnlInfo && <div className="pnl">{pnlInfo.value.toFixed(2)}</div>}
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="app">
      <button className="add-pnl-btn" onClick={() => setIsModalOpen(true)}>
        Add PNL
      </button>

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

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add PNL Entry</h2>
              <button
                className="close-button"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="input-group">
                <label>Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className="radio-group">
                <label>Trade Result</label>
                <div className="radio-options">
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="hit"
                      name="tradeType"
                      value="hit"
                      checked={tradeType === "hit"}
                      onChange={(e) => setTradeType(e.target.value)}
                    />
                    <label htmlFor="hit">Hit</label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="miss"
                      name="tradeType"
                      value="miss"
                      checked={tradeType === "miss"}
                      onChange={(e) => setTradeType(e.target.value)}
                    />
                    <label htmlFor="miss">Miss</label>
                  </div>
                </div>
              </div>
              <div className="input-group">
                <label>PNL Value</label>
                <input
                  type="number"
                  value={pnlValue}
                  onChange={(e) => setPnlValue(e.target.value)}
                  // placeholder="Enter PNL value"
                  step="0.01"
                />
              </div>
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
