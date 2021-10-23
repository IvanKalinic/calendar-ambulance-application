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
  const [current, setCurrent] = useState({});

  const value = {
    reservedDate,
    setReservedDate,
    thisWeekDates,
    setThisWeekDates,
    dayCounter,
    setDayCounter,
    current,
    setCurrent,
  };

  return (
    <ReservedDateContext.Provider value={value}>
      {children}
    </ReservedDateContext.Provider>
  );
};
