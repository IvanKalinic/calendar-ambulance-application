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
