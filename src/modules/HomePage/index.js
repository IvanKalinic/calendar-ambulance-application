import React from "react";
import Calendar from "../../components/Calendar";

const HomePage = () => {
  return (
    <div>
      <h2>Hello and welcome to your ordination!</h2>
      <p>
        You can book one of the free appointments in our calendar.Please notice
        that you can book maximum of two appointments in one week and one
        appointment per day. Please
      </p>
      <h4>See you there!</h4>
      <Calendar />
    </div>
  );
};

export default HomePage;
