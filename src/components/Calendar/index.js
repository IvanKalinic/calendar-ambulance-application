import React, { useState, useEffect } from "react";
import { calculateFullDate } from "../../utils";
import { months, days, hours, emptyEvents } from "../../consts";
import "./index.scss";
import MessagePopup from "../MessagePopup";
const { datesGenerator } = require("dates-generator");

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendar, setCalendar] = useState(calculateFullDate(selectedDate));
  const [dates, setDates] = useState([]);
  const [content, setContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  // console.log(calendar);
  const [reservedDate, setReservedDate] = useState({
    key: "",
    events: emptyEvents,
  });

  const handleEvent = (day, index) => {
    setShowPopup((prev) => !prev);
    // handleAddEvent(day, index)
  };

  console.log(reservedDate.events);

  useEffect(() => {
    const body = {
      month: calendar.month,
      year: calendar.year,
      day: calendar.day,
    };
    const { dates, nextMonth, nextYear, previousMonth, previousYear } =
      datesGenerator(body);

    // setDates([...dates]);
    setDates(
      dates.find((week) =>
        week.find(
          (day) => day.date === calendar.day && day.month === calendar.month
        )
      )
    );
    setCalendar({
      ...calendar,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear,
    });
    // console.log({ dates, nextMonth, nextYear, previousMonth, previousYear });
  }, []);

  // const findCurrentWeek = () => {
  //   setDates(
  //     dates.find((week) =>
  //       week.find(
  //         (day) => day.date === calendar.day && day.month === calendar.month
  //       )
  //     )
  //   );
  //   // return dates.find(
  //   //   (week) => week.date === calendar.day && week.month === calendar.month
  //   // );
  // };

  // console.log(dates);
  console.log(dates);
  return (
    <div className="calendar-parent-container">
      <div className="container">
        <div className="month">{months[calendar.month]}</div>
        <div>
          <table className="calendar-table" style={{ width: "100%" }}>
            <MessagePopup
              showMessage={showPopup}
              setShowMessage={setShowPopup}
            />
            <tbody>
              <tr className="flex-container">
                <td
                  style={{ padding: "5px 0", flex: "1", textAlign: "center" }}
                >
                  Hours
                </td>
                {days.map((day) => (
                  <td key={day} style={{ padding: "5px 0", flex: "1" }}>
                    <div
                      style={{
                        textAlign: "center",
                        padding: "5px 0",
                      }}
                    >
                      {day}
                    </div>
                  </td>
                ))}
              </tr>

              {/* {dates.length > 0 &&
                dates.map((week) => (
                  <tr key={JSON.stringify(week[0])}>
                    {week.map((each) => (
                      <td
                        key={JSON.stringify(each)}
                        style={{ padding: "5px 0" }}
                      >
                        <div style={{ textAlign: "center", padding: "5px 0" }}>
                          {each.date + 1}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))} */}

              {dates.length > 0 && (
                <tr className="flex-container">
                  <td className="cell">
                    <hr />
                    {hours.map((hour) => (
                      <p>
                        {hour}
                        <hr />
                      </p>
                    ))}
                  </td>
                  {dates.map((day, index) => (
                    <td key={index} className="cell cell-events">
                      {reservedDate.events.map((ev, index) => (
                        <button className="event-btn" onClick={handleEvent}>
                          {ev?.content}
                        </button>
                      ))}
                      {/* <div style={{ marginTop: "200px" }}>{day.date + 1}</div> */}
                    </td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
