import React, { useState, useEffect } from "react";
import { calculateFullDate, getDayName, returnArray } from "../../utils";
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
  let tempDays = [];
  let tempReservedDates = [];
  // console.log(calendar);
  const [reservedDate, setReservedDate] = useState([
    // {
    //   key: "",
    //   events: emptyEvents,
    // },
  ]);
  const [weekEvents, setWeekEvents] = useState([]);

  const handleEvent = (day, index, e) => {
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

    // setDates(
    //   dates.find((week) =>
    //     week.find(
    //       (day) => day.date === calendar.day && day.month === calendar.month
    //       // (day) => day.date > calendar.day && day.date < calendar.day + 7
    //     )
    //   )
    // );

    dates.map((week) =>
      week.forEach((day) => {
        if (
          day.date > calendar.day &&
          day.date < calendar.day + 8 &&
          day.month >= calendar.month
        ) {
          tempDays.push(day);
        }
      })
    );

    setDates(tempDays);

    setCalendar({
      ...calendar,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear,
    });
  }, []);

  useEffect(() => {
    dates?.forEach((day) => {
      if (getDayName(day.jsDate) === "nedjelja") {
        day.color = "grey";
      }
    });

    dates?.map((day) =>
      tempReservedDates.push({
        key: day.date,
        events: emptyEvents,
        color: day.color,
      })
    );

    tempReservedDates?.forEach((day) => {
      day.events = returnArray(day.key, calendar);
    });

    setReservedDate(tempReservedDates);
  }, [dates]);

  console.log(dates);
  console.log(reservedDate);

  // reservedDate?.forEach((day, index) => {
  //   console.log(day);
  //   if (day.key % 2 === 0) {
  //     for (let i = 0; i < 22; i++) {
  //       day.events[i] = "";
  //       if (i === 6) {
  //         day.events[i] = "Pauza";
  //       }
  //     }
  //     console.log(day.events);
  //   }
  //   if (day.key % 2 !== 0) {
  //     for (let i = 0; i < 22; i++) {
  //       day.events[i] = "";
  //       if (i === 16) {
  //         day.events[i] = "Pauza";
  //       }
  //     }
  //   }
  // });

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
                {dates.map((day) => (
                  <td key={day} style={{ padding: "5px 0", flex: "1" }}>
                    <div
                      style={{
                        textAlign: "center",
                        padding: "5px 0",
                      }}
                    >
                      {getDayName(day.jsDate)}
                    </div>
                  </td>
                ))}
              </tr>
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
                      {reservedDate[index]?.events.map((ev, evIndex) => (
                        <button
                          key={evIndex}
                          className={`event-btn ${reservedDate[index]?.color} ${
                            reservedDate[index]?.color !== "grey"
                              ? `${ev.color}`
                              : null
                          }`}
                          onClick={handleEvent}
                        >
                          {reservedDate[index]?.color === "grey"
                            ? "Ne radimo"
                            : ev.content}
                        </button>
                      ))}
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
