import React, { useState, useEffect, useRef } from "react";
import {
  calculateFullDate,
  getDayName,
  returnArray,
  make15RandPairs,
} from "../../utils";
import { months, hours, emptyEvents } from "../../consts";
import { useReservedDate } from "../../context/ReservedDate";
import MessagePopup from "../MessagePopup";
import Loader from "../Loader";
import { Edit } from "../../assets/icons";
import "./index.scss";
const { datesGenerator } = require("dates-generator");

const MAX_WEEK_EVENTS = 2;

const Calendar = () => {
  const [calendar, setCalendar] = useState(calculateFullDate(new Date()));
  const [showPopup, setShowPopup] = useState(false);
  const [randomEventsArray, setRandomEventsArray] = useState([]);
  let loading = true;
  let tempDays = [];
  let tempReservedDates = [];
  let bigArray = [];
  const ref = useRef();
  const {
    reservedDate,
    setReservedDate,
    thisWeekDates,
    setThisWeekDates,
    dayCounter,
    setCurrent,
  } = useReservedDate();

  const handleEvent = (ev, evIndex, index) => {
    //check edge cases (pause,not working and week and day counters)
    setCurrent({ index, evIndex });
    if (
      ev.content === "Pauza" ||
      ev.content === "Ne radimo" ||
      ev.clickable === false
    ) {
      setShowPopup(false);
      return;
    } else if (
      dayCounter?.includes(reservedDate[index].key.toString()) ||
      dayCounter?.length === MAX_WEEK_EVENTS
    ) {
      if (ev.editable) {
        setCurrent({ index, evIndex, edit: true });
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    } else {
      setShowPopup(!showPopup);
    }
  };

  useEffect(() => {
    const body = {
      month: calendar.month,
      year: calendar.year,
      day: calendar.day,
    };
    const { dates } = datesGenerator(body);

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
      // adding 22 events forEach day
      day.events = returnArray(day.key, calendar);
    });

    // delete key of the day that has passed
    dayCounter.forEach((el, index) => {
      let counter = 0;
      thisWeekDates.map((day) => {
        if (el === day.key) {
          counter++;
        }
      });
      if (counter === 0) {
        dayCounter.splice(index, 1);
      }
    });

    setReservedDate(tempReservedDates);
  }, [thisWeekDates]);

  useEffect(() => {
    setTimeout(() => {
      if (reservedDate) {
        reservedDate.map((date, index) => {
          let tempArray = [];
          date.events.map((ev, index) => {
            if (ev.color === "green" && ev.content === "") {
              tempArray.push(index);
            }
          });
          bigArray[index] = tempArray; // for each day remember "green" event's indexes
        });
      }
      setRandomEventsArray(make15RandPairs(bigArray));
    }, 2000);
  }, [reservedDate]);

  randomEventsArray?.map(({ index, newIndex }, counter) => {
    // making random events red color and unclickable
    reservedDate.forEach((date, key) => {
      if (index === key) {
        reservedDate[key].events[newIndex].color = "red";
        reservedDate[key].events[newIndex].clickable = false;
      }
    });
    if (counter === 14) {
      loading = false;
    }
  });

  useEffect(() => {
    //clicking outside of popup
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

  return (
    <div className="calendar-parent-container">
      {showPopup && <div className="overlay"></div>}
      {loading && <Loader />}
      <div className="container">
        <div>
          <table className="calendar-table" style={{ width: "100%" }}>
            <div className="month">{months[calendar.month]}</div>
            <div ref={ref}>
              <MessagePopup
                showMessage={showPopup}
                setShowMessage={setShowPopup}
              />
            </div>
            <tbody>
              <tr className="flex-container">
                <td className="hours">Sati</td>
                {thisWeekDates.map((day, index) => (
                  <td key={day} style={{ padding: "5px 0", flex: "1" }}>
                    <div className="days">{getDayName(day.jsDate)}</div>
                    <div className="keys">{`${reservedDate[index]?.key}.`}</div>
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
                          key={`${evIndex}-${index}`}
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
                          {ev.editable ? (
                            <span style={{ marginLeft: "5px" }}>
                              <Edit />
                            </span>
                          ) : null}
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
