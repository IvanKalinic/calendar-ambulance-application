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
import { Edit } from "../../assets/icons";
import "./index.scss";
const { datesGenerator } = require("dates-generator");

const Calendar = () => {
  const [calendar, setCalendar] = useState(calculateFullDate(new Date()));
  const [showPopup, setShowPopup] = useState(false);
  const [randomEventsArray, setRandomEventsArray] = useState([]);
  let tempDays = [];
  let tempReservedDates = [];
  let bigArray = [];
  // let randomEventsArray = [];
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
    setCurrent({ index, evIndex });
    if (ev.content === "Pauza" || ev.content === "Ne radimo") {
      setShowPopup(false);
      return;
    } else if (
      dayCounter?.includes(reservedDate[index].key.toString()) ||
      dayCounter?.length === 2
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
      day.events = returnArray(day.key, calendar);
    });

    dayCounter.forEach((el, index) => {
      let counter = 0;
      thisWeekDates.map((day) => {
        if (el === day.key) {
          counter++;
        }
      });
      if (counter === 0) {
        dayCounter.splice(index);
      }
    });

    setReservedDate(tempReservedDates);
  }, [thisWeekDates]);

  useEffect(() => {
    setTimeout(() => {
      if (reservedDate) {
        console.log("Inside of if statement");
        reservedDate.map((date, index) => {
          let tempArray = [];
          date.events.map((ev, index) => {
            if (ev.color === "green") {
              tempArray.push(index);
            }
          });
          bigArray[index] = tempArray;
        });
        console.log(bigArray);
        // if (bigArray.length === 7) {
        //   for (let i = 0; i < 15; i++) {
        //     let index = randomIntFromInterval(0, 6);
        //     if (bigArray[index]?.length > 0) {
        //       let newIndex = randomIntFromInterval(
        //         bigArray[index][0],
        //         bigArray[index][bigArray[index].length - 1]
        //       );
        //       let delIndex = bigArray[index].indexOf(newIndex);
        //       bigArray[index].splice(delIndex);
        //       // setRandomEventsArray([...randomEventsArray, { index, newIndex }]);
        //       randomEventsArray.push({ index, newIndex });
        //     } else {
        //       i--;
        //     }
        //   }
        // }
      }
      setRandomEventsArray(make15RandPairs(bigArray));
    }, 2000);
  }, [reservedDate]);

  console.log("This is random events array: ");
  console.log(randomEventsArray);

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
              />
            </div>
            <tbody>
              <tr className="flex-container">
                <td
                  style={{ padding: "5px 0", flex: "1", textAlign: "center" }}
                >
                  Sati
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
