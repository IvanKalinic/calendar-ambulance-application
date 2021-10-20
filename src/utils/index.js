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

export const returnArray = (day) => {
  let temp = [];
  if (day % 2 === 0) {
    for (let i = 1; i < 22; i++) {
      temp.push("");
      if (i === 6) {
        temp.push("Pauza");
      }
    }
  } else {
    for (let i = 1; i < 22; i++) {
      temp.push("");
      if (i === 16) {
        temp.push("Pauza");
      }
    }
  }
  return temp;
};
