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
    for (let i = 0; i < 22; i++) {
      if (i < 12) {
        if (i === 6) {
          temp.push({ color: "yellow", content: "Pauza" });
        } else if (
          getDayName(
            `${calendar.month + 1}/${day}/${calendar.year}, 12:00:00 AM`
          ) === "nedjelja"
        ) {
          temp.push({ color: "grey", content: "Ne radimo" });
        } else {
          temp.push({ color: "green", content: "" });
        }
      } else {
        temp.push({ color: "grey", content: "Ne radimo" });
      }
    }
  } else {
    for (let i = 0; i < 22; i++) {
      if (i > 9) {
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
