import React from "react";
import HomePage from "./modules/HomePage";
import { PossibleDatesProvider } from "./context/PossibleDates";

const App = () => {
  return (
    <>
      <PossibleDatesProvider>
        <HomePage />
      </PossibleDatesProvider>
    </>
  );
};

export default App;
