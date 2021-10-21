import React, { useState, useEffect, useRef } from "react";
import { calculateFullDate, getDayName, returnArray } from "../../utils";
import { months, days, hours, emptyEvents } from "../../consts";
import { useReservedDate } from "../../context/ReservedDate";
import "./index.scss";
import MessagePopup from "../MessagePopup";
const { datesGenerator } = require("dates-generator");

const Calendar = () => {
  const [calendar, setCalendar] = useState(calculateFullDate(new Date()));
  const [current, setCurrent] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  let tempDays = [];
  let tempReservedDates = [];
  const ref = useRef();
  const {
    reservedDate,
    setReservedDate,
    thisWeekDates,
    setThisWeekDates,
    dayCounter,
    weekCounter,
  } = useReservedDate();

  const handleEvent = (ev, evIndex, index) => {
    if (
      dayCounter.includes(reservedDate[index].key.toString()) ||
      weekCounter === 2
    ) {
      setShowPopup(false);
    } else {
      setShowPopup(!showPopup);
      setCurrent({ index, evIndex });
    }
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

    //za next week opcija

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

    setThisWeekDates(tempDays);

    setCalendar({
      ...calendar,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear,
    });
  }, []);

  useEffect(() => {
    thisWeekDates?.forEach((day) => {
      if (getDayName(day.jsDate) === "nedjelja") {
        day.color = "grey";
      }
    });

    thisWeekDates?.map((day) =>
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
  }, [thisWeekDates]);

  useEffect(() => {
    const onBodyClicked = (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }
      if (showPopup && event.target.tagName.toUpperCase() === "INPUT") {
        return;
      }
      if (showPopup) {
        setShowPopup(!showPopup);
      }
    };
    document.body.addEventListener("click", onBodyClicked, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClicked);
    };
  }, [showPopup]);

  console.log(thisWeekDates);
  return (
    <div className="calendar-parent-container">
      {showPopup && <div className="overlay"></div>}
      <div className="container">
        <div className="month">{months[calendar.month]}</div>
        <div>
          <table className="calendar-table" style={{ width: "100%" }}>
            <div ref={ref}>
              <MessagePopup
                showMessage={showPopup}
                setShowMessage={setShowPopup}
                current={current}
              />
            </div>
            <tbody>
              <tr className="flex-container">
                <td
                  style={{ padding: "5px 0", flex: "1", textAlign: "center" }}
                >
                  Hours
                </td>
                {thisWeekDates.map((day) => (
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
              {thisWeekDates.length > 0 && (
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
                  {thisWeekDates.map((day, index) => (
                    <td key={index} className="cell cell-events">
                      {reservedDate[index]?.events.map((ev, evIndex) => (
                        <button
                          key={evIndex}
                          className={`event-btn ${reservedDate[index]?.color} ${
                            reservedDate[index]?.color !== "grey"
                              ? `${ev.color}`
                              : null
                          }`}
                          onClick={() => handleEvent(ev, evIndex, index)}
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
