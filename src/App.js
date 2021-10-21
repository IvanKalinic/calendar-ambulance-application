import React from "react";
import HomePage from "./modules/HomePage";
import { ReservedDateProvider } from "./context/ReservedDate";

const App = () => {
  return (
    <>
      <ReservedDateProvider>
        <HomePage />
      </ReservedDateProvider>
    </>
  );
};

export default App;
