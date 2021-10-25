const MAX_WEEK_EVENTS = 2;
const NUMBER_OF_DAY_EVENTS = 22;
const MIN_NUM_OF_CHARACTERS = 7;

export const isValidValue = (value) => {
  return (
    value.length >= MIN_NUM_OF_CHARACTERS &&
    value !== "Pauza" &&
    value !== "Ne radimo"
  );
};
export const isChangingInProcess = (value, length) => {
  return value === "" && length >= 7;
};
export const isSameValue = (length, value) => {
  return length >= 7 && !value;
};
export const calculateFullDate = (selectedDate) => {
  return {
    year: selectedDate.getFullYear(),
    month: selectedDate.getMonth(),
    day: selectedDate.getDate(),
    time: selectedDate.toLocaleTimeString("hr", {
      timeStyle: "short",
      hour12: false,
      timeZone: "CET",
    }),
  };
};

export const getDayName = (jsDate) => {
  return new Date(jsDate).toLocaleDateString("hr", { weekday: "long" });
};

export const notAllowedEvent = (ev) => {
  return (
    ev.content === "Pauza" ||
    ev.content === "Ne radimo" ||
    ev.clickable === false
  );
};

export const allowedDate = (date, ev) => {
  return ev.color === "green" && ev.content === "" && date.color !== "grey";
};
export const checkDayAndWeekCounter = (dayCounter, key) => {
  return (
    dayCounter?.includes(key.toString()) ||
    dayCounter?.length === MAX_WEEK_EVENTS
  );
};

const checkIsSpecificDay = (calendar, day, dayName) => {
  return (
    getDayName(`${calendar.month + 1}/${day}/${calendar.year}, 12:00:00 AM`) ===
    dayName
  );
};

const allowedEvents = (evenDay) => {
  return {
    eventsIndex: evenDay ? 12 : 9,
    breakTimeIndex: evenDay ? 6 : 16,
  };
};

// depending on shifts (morning, afternoon) and (breaktime and weekends)
const populateDayWithEvents = (
  evenDay,
  i,
  breakTimeIndex,
  day,
  calendar,
  temp
) => {
  if (
    evenDay
      ? checkIsSpecificDay(calendar, day, "nedjelja")
      : checkIsSpecificDay(calendar, day, "subota") ||
        checkIsSpecificDay(calendar, day, "nedjelja")
  ) {
    temp.push({ color: "grey", content: "Ne radimo" });
  } else if (i === breakTimeIndex) {
    temp.push({ color: "yellow", content: "Pauza" });
  } else {
    temp.push({ color: "green", content: "" });
  }
  return temp;
};

export const eventsPerDay = (day, calendar) => {
  let temp = [];
  const evenDay = day % 2 === 0 ? true : false;
  const { eventsIndex, breakTimeIndex } = allowedEvents(evenDay);
  if (evenDay) {
    for (let i = 0; i < NUMBER_OF_DAY_EVENTS; i++) {
      if (i < eventsIndex) {
        temp = populateDayWithEvents(
          evenDay,
          i,
          breakTimeIndex,
          day,
          calendar,
          temp
        );
      } else {
        temp.push({ color: "grey", content: "Ne radimo" });
      }
    }
  } else {
    for (let i = 0; i < NUMBER_OF_DAY_EVENTS; i++) {
      if (i > eventsIndex) {
        temp = populateDayWithEvents(
          evenDay,
          i,
          breakTimeIndex,
          day,
          calendar,
          temp
        );
      } else {
        temp.push({ color: "grey", content: "Ne radimo" });
      }
    }
  }
  return temp;
};

export const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const make15RandPairs = (bigArray) => {
  let randomEventsArray = new Array(15);
  if (bigArray.length === 7) {
    for (let i = 0; i < 15; i++) {
      let index = randomIntFromInterval(0, 6);
      if (bigArray[index]?.length > 0) {
        let newIndex = 0;
        do {
          newIndex = randomIntFromInterval(
            bigArray[index][0],
            bigArray[index][bigArray[index].length - 1]
          );
        } while (
          newIndex === 6 ||
          newIndex === 16 ||
          bigArray[index].indexOf(newIndex)
        );
        let delIndex = bigArray[index].indexOf(newIndex);
        bigArray[index].splice(delIndex, 1);
        randomEventsArray[i] = { index, newIndex };
        console.log({ index, newIndex });
      } else {
        i--;
      }
    }
  }
  return randomEventsArray;
};
