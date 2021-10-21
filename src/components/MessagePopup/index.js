import React, { useState, useEffect } from "react";
import { useReservedDate } from "../../context/ReservedDate";
import Warning from "../Warning";
import "./index.scss";

const MessagePopup = ({ showMessage, setShowMessage }) => {
  const [value, setValue] = useState();
  const [warning, setWarning] = useState(false);
  const { reservedDate, dayCounter, setDayCounter, current } =
    useReservedDate();
  const { evIndex, index, edit } = current;

  useEffect(() => {
    setWarning(false);
  }, [current]);

  const addContentToEvent = () => {
    if (value && value !== "Pauza" && value !== "Ne radimo") {
      reservedDate[index].events[evIndex].content = value;
      reservedDate[index].events[evIndex].color = "red";
      reservedDate[index].events[evIndex].editable = true;
      setDayCounter([...dayCounter, reservedDate[index].key.toString()]);
      setShowMessage(!showMessage);
      setValue("");
    } else {
      setWarning(true);
    }
  };

  const deleteContent = () => {
    reservedDate[index].events[evIndex].editable = false;
    reservedDate[index].events[evIndex].color = "green";
    reservedDate[index].events[evIndex].content = "";
    setDayCounter(
      dayCounter.filter((el) => el !== reservedDate[index].key.toString())
    );
    setShowMessage(!showMessage);
  };

  const handleSave = () => {
    if (value) {
      reservedDate[index].events[evIndex].content = value;
    }
    setShowMessage(!showMessage);
    setValue("");
  };

  console.log("DAY COUNTER:");
  console.log(current);
  console.log(reservedDate);
  console.log(reservedDate[index]?.key?.toString());
  console.log(dayCounter);

  return (
    <>
      {showMessage ? (
        <div className="modal-content">
          {warning && <Warning />}
          <input
            type="text"
            id="appointment"
            className="form__input"
            autoComplete="off"
            placeholder=" "
            value={value || reservedDate[index].events[evIndex].content} // event.content
            onChange={(e) => setValue(e.target.value)}
          ></input>
          <div className="buttons-container">
            {edit ? (
              <button
                type="submit"
                className="btn btn-modal"
                onClick={handleSave}
              >
                Save
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-modal"
                onClick={addContentToEvent}
              >
                Add
              </button>
            )}
            {edit ? (
              <button className="btn btn-modal" onClick={deleteContent}>
                Delete
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MessagePopup;
