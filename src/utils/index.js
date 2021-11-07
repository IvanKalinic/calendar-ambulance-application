const MAX_WEEK_EVENTS = 2;
const NUMBER_OF_DAY_EVENTS = 22;
const MIN_NUM_OF_CHARACTERS = 7;
const NUMBER_OF_RANDOM_EVENTS = 15;
const WEEK_LENGTH = 7;
const MORNING_BREAKTIME_INDEX = 6;
const AFTERNOON_BREAKTIME_INDEX = 16;

export const isValidValue = (value) => {
  return (
    value.length >= MIN_NUM_OF_CHARACTERS &&
    value !== "Pauza" &&
    value !== "Ne radimo"
  );
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
    getDayName(
      `${
        calendar.day !== 31 ? calendar.month + 1 : calendar.month + 2
      }/${day}/${calendar.year}, 12:00:00 AM`
    ) === dayName
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

const checkEventEdgeCase = (eventIndex, existingIndex) => {
  return (
    eventIndex === MORNING_BREAKTIME_INDEX ||
    eventIndex === AFTERNOON_BREAKTIME_INDEX ||
    existingIndex === -1
  );
};
export const make15RandPairs = (greenEventsArray) => {
  let randomEventsArray = new Array(NUMBER_OF_RANDOM_EVENTS);
  if (greenEventsArray.length === WEEK_LENGTH) {
    for (let i = 0; i < NUMBER_OF_RANDOM_EVENTS; i++) {
      let dayIndex = randomIntFromInterval(0, WEEK_LENGTH - 1);
      if (greenEventsArray[dayIndex]?.length > 0) {
        let eventIndex = 0;
        // give index random value between 1st and last possible event in day and check edge case
        do {
          eventIndex = randomIntFromInterval(
            greenEventsArray[dayIndex][0],
            greenEventsArray[dayIndex][greenEventsArray[dayIndex].length - 1]
          );
        } while (
          // breaktime or existing index
          checkEventEdgeCase(
            eventIndex,
            greenEventsArray[dayIndex].indexOf(eventIndex) // -1 if not exists
          )
        );
        // make green event red
        greenEventsArray[dayIndex].splice(
          greenEventsArray[dayIndex].indexOf(eventIndex),
          1
        );
        randomEventsArray[i] = { dayIndex, eventIndex }; // generate one pair (day,event)
      } else {
        i--;
      }
    }
  }
  return randomEventsArray;
};
