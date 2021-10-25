import React, { createContext, useContext, useState } from "react";

const PossibleDatesContext = createContext();

//custom hook
export const usePossibleDates = () => {
  const possibleDatesContext = useContext(PossibleDatesContext);
  if (possibleDatesContext === undefined) {
    throw new Error("useReservedDate must be used within its provider");
  }
  return possibleDatesContext;
};

export const PossibleDatesProvider = ({ children }) => {
  const [possibleDates, setPossibleDates] = useState([]);
  const [thisWeekDates, setThisWeekDates] = useState([]);
  const [dayCounter, setDayCounter] = useState([]);
  const [current, setCurrent] = useState({});

  const value = {
    possibleDates,
    setPossibleDates,
    thisWeekDates,
    setThisWeekDates,
    dayCounter,
    setDayCounter,
    current,
    setCurrent,
  };

  return (
    <PossibleDatesContext.Provider value={value}>
      {children}
    </PossibleDatesContext.Provider>
  );
};
