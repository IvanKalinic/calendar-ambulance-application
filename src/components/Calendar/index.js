import React, { useState, useEffect, useRef } from "react";
import {
  calculateFullDate,
  getDayName,
  notAllowedEvent,
  allowedDate,
  checkDayAndWeekCounter,
  eventsPerDay,
  make15RandPairs,
} from "../../utils";
import { months, hours, emptyEvents } from "../../consts";
import { usePossibleDates } from "../../context/PossibleDates";
import MessagePopup from "../MessagePopup";
import Loader from "../Loader";
import { Edit } from "../../assets/icons";
import "./index.scss";
const { datesGenerator } = require("dates-generator");

const Calendar = () => {
  const [calendar, setCalendar] = useState(calculateFullDate(new Date()));
  const [showPopup, setShowPopup] = useState(false);
  const [randomEventsArray, setRandomEventsArray] = useState([]);
  let loading = true;
  let tempDays = [];
  let tempReservedDates = [];
  let greenEventsArray = []; // array for open events per day
  const {
    possibleDates,
    setPossibleDates,
    thisWeekDates,
    setThisWeekDates,
    dayCounter,
    setCurrent,
  } = usePossibleDates();

  const inNextSevenDays = (day) => {
    return (
      day.date > calendar.day &&
      day.date < calendar.day + 8 &&
      day.month >= calendar.month
    );
  };

  const nextMonthOverlap = (day, diff) => {
    return day.date >= 1 && day.date < diff + 1 && day.month > calendar.month;
  };

  const setNextMonth = (diff, tempDays) => {
    if (diff > tempDays.length) {
      setCalendar({ ...calendar, month: calendar.month + 1 });
    }
  };
  const checkIsEventEditable = (ev, index, evIndex) => {
    if (ev.editable) {
      setCurrent({ index, evIndex, edit: true });
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };

  //check edge cases (pause,not working, week and day counters)
  const handleEvent = (ev, evIndex, index) => {
    setCurrent({ index, evIndex });
    if (notAllowedEvent(ev)) {
      setShowPopup(false);
      return;
    }
    if (checkDayAndWeekCounter(dayCounter, possibleDates[index].key)) {
      checkIsEventEditable(ev, index, evIndex);
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

    dates.forEach((week) =>
      week.forEach((day) => {
        if (inNextSevenDays(day)) {
          tempDays.push(day);
        }
      })
    );

    // if days fall in the next month
    let diff = 7 - tempDays.length;
    if (diff > 0) {
      dates.forEach((week) => {
        week.forEach((day) => {
          if (nextMonthOverlap(day, diff)) {
            tempDays.push(day);
          }
        });
      });
    }

    setNextMonth(diff, tempDays); // if there is greater amount of days in next month than the current one set that month name
    setThisWeekDates(tempDays);
  }, []);

  useEffect(() => {
    thisWeekDates?.forEach((day) => {
      if (getDayName(day.jsDate) === "nedjelja") {
        day.color = "grey";
      }
    });

    thisWeekDates?.forEach((day) =>
      tempReservedDates.push({
        key: day.date,
        events: emptyEvents,
        color: day.color,
      })
    );

    // adding 22 events for each day (number of 30mins period)
    tempReservedDates?.forEach((day) => {
      day.events = eventsPerDay(day.key, calendar);
    });

    // delete key of the day that has passed from day counter
    dayCounter.forEach((el, index) => {
      if (!thisWeekDates.filter((day) => day.key == el)) {
        dayCounter.splice(index, 1);
      }
    });

    setPossibleDates(tempReservedDates);
  }, [thisWeekDates]);

  useEffect(() => {
    setTimeout(() => {
      if (possibleDates) {
        possibleDates.forEach((date, index) => {
          let tempArray = [];
          date.events.forEach((ev, index) => {
            if (allowedDate(date, ev)) {
              tempArray.push(index);
            }
          });
          greenEventsArray[index] = tempArray; // for each day remember "green" event's indexes
        });
      }
      setRandomEventsArray(make15RandPairs(greenEventsArray));
    }, 2000);
  }, [possibleDates]);

  //making random events red colored and unclickable
  randomEventsArray?.map(({ dayIndex, eventIndex }, counter) => {
    possibleDates.forEach((date, key) => {
      if (dayIndex === key) {
        possibleDates[key].events[eventIndex].color = "red";
        possibleDates[key].events[eventIndex].clickable = false;
      }
    });
    // if all events are loaded
    if (counter === 14) {
      loading = false;
    }
  });

  return (
    <div className="calendar-parent-container">
      {showPopup && <div className="overlay"></div>}
      {loading && <Loader />}
      <div className="container">
        <div>
          <table className="calendar-table" style={{ width: "100%" }}>
            <div className="month">{months[calendar.month]}</div>
            <MessagePopup
              showMessage={showPopup}
              setShowMessage={setShowPopup}
            />
            <tbody>
              <tr className="flex-container">
                <td className="hours">Sati</td>
                {thisWeekDates.map((day, index) => (
                  <td key={day} style={{ padding: "5px 0", flex: "1" }}>
                    <div className="days">{getDayName(day.jsDate)}</div>
                    <div className="keys">{`${possibleDates[index]?.key}.`}</div>
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
                      {possibleDates[index]?.events.map((ev, evIndex) => (
                        <button
                          key={`${evIndex}-${index}`}
                          className={`event-btn ${
                            possibleDates[index]?.color
                          } ${
                            possibleDates[index]?.color !== "grey"
                              ? `${ev.color}`
                              : null
                          }`}
                          onClick={() => handleEvent(ev, evIndex, index)}
                        >
                          {possibleDates[index]?.color === "grey"
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
