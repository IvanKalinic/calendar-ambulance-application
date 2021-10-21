import React, { createContext, useContext, useState } from "react";

const ReservedDateContext = createContext();

//custom hook
export const useReservedDate = () => {
  const reservedDateContext = useContext(ReservedDateContext);
  if (reservedDateContext === undefined) {
    throw new Error("useReservedDate must be used within its provider");
  }
  return reservedDateContext;
};

export const ReservedDateProvider = ({ children }) => {
  const [reservedDate, setReservedDate] = useState([]);
  const [thisWeekDates, setThisWeekDates] = useState([]);
  const [dayCounter, setDayCounter] = useState([]);
  const [weekCounter, setWeekCounter] = useState(0);

  const findDoubleDayCounter = (day) => {
    let tempArray = dayCounter.filter((el) => el === day);
    if (tempArray.length > 1) {
      return false;
    }
  };
  const value = {
    reservedDate,
    setReservedDate,
    thisWeekDates,
    setThisWeekDates,
    dayCounter,
    setDayCounter,
    weekCounter,
    setWeekCounter,
  };

  return (
    <ReservedDateContext.Provider value={value}>
      {children}
    </ReservedDateContext.Provider>
  );
};
