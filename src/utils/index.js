export const convertToDate = (isoString) => {
  const date = new Date(isoString);
  const fullDate = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    time: date.toLocaleTimeString("hr", {
      timeStyle: "short",
      hour12: false,
      timeZone: "CET",
    }),
  };

  console.log(fullDate);
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

export const returnArray = (day, calendar) => {
  let temp = [];
  if (day % 2 === 0) {
    for (let i = 1; i < 22; i++) {
      if (i < 12) {
        temp.push({ color: "green", content: "" });
        if (i === 6) {
          temp.push({ color: "yellow", content: "Pauza" });
        }
      } else {
        temp.push({ color: "grey", content: "Ne radimo" });
      }
    }
  } else {
    for (let i = 1; i < 23; i++) {
      if (i > 10) {
        if (
          getDayName(
            `${calendar.month + 1}/${day}/${calendar.year}, 12:00:00 AM`
          ) === "subota"
        ) {
          temp.push({ color: "grey", content: "Ne radimo" });
        } else {
          if (i === 16) {
            temp.push({ color: "yellow", content: "Pauza" });
          } else {
            temp.push({ color: "green", content: "" });
          }
        }
      } else {
        temp.push({ color: "grey", content: "Ne radimo" });
      }
    }
  }
  return temp;
};
