import React, { useState } from "react";
import { useReservedDate } from "../../context/ReservedDate";
import "./index.scss";

const MessagePopup = ({ showMessage, setShowMessage, current }) => {
  const [value, setValue] = useState();
  const { evIndex, index } = current;
  const {
    reservedDate,
    setReservedDate,
    dayCounter,
    setDayCounter,
    weekCounter,
    setWeekCounter,
  } = useReservedDate();

  const addContentToEvent = () => {
    reservedDate[index].events[evIndex].content = value;
    if (value) {
      reservedDate[index].events[evIndex].color = "red";
      setWeekCounter(weekCounter + 1);
      setDayCounter([...dayCounter, reservedDate[index].key.toString()]);
    }
    setShowMessage(!showMessage);
    setValue("");
  };
  console.log(dayCounter);
  return (
    <>
      {showMessage ? (
        <div className="modal-content">
          <input
            type="text"
            id="appointment"
            className="form__input"
            autoComplete="off"
            placeholder=" "
            value={value || reservedDate[index].events[evIndex].content} // event.content
            onChange={(e) => setValue(e.target.value)}
          ></input>
          <button
            type="submit"
            className="btn btn-modal"
            onClick={addContentToEvent}
          >
            Add
          </button>
        </div>
      ) : null}
    </>
  );
};

export default MessagePopup;
