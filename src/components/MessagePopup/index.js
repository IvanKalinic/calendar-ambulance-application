import React, { useState, useEffect, useRef } from "react";
import { usePossibleDates } from "../../context/PossibleDates";
import { isValidValue, isSameValue } from "../../utils";
import Warning from "../Warning";
import { Close } from "../../assets/icons";
import "./index.scss";

const MessagePopup = ({ showMessage, setShowMessage }) => {
  const [value, setValue] = useState("");
  const [warning, setWarning] = useState(false);
  const { possibleDates, dayCounter, setDayCounter, current } =
    usePossibleDates();
  const { evIndex, index, edit } = current;
  const ref = useRef();

  useEffect(() => {
    setWarning(false);
  }, [current]);

  useEffect(() => {
    setValue("");
  }, [showMessage]);

  const handleClose = () => {
    if (!warning) setShowMessage(!showMessage);
  };

  const handleValue = (e) => {
    if (e.target.value !== "") {
      setValue(e.target.value);
      possibleDates[index].events[evIndex].content =
        possibleDates[index].events[evIndex].prevValue; // if x is pressed and value is not saved
      setWarning(false);
    } else {
      possibleDates[index].events[evIndex].content = "";
      setValue("");
      setWarning(true);
    }
  };

  const addContentToEvent = () => {
    if (isValidValue(value)) {
      possibleDates[index].events[evIndex].content = value;
      possibleDates[index].events[evIndex].prevValue = value;
      possibleDates[index].events[evIndex].color = "red";
      possibleDates[index].events[evIndex].editable = true;
      setDayCounter([...dayCounter, possibleDates[index].key.toString()]);
      setShowMessage(!showMessage);
      setValue("");
    } else {
      setWarning(true);
    }
  };

  const deleteContent = () => {
    possibleDates[index].events[evIndex].editable = false;
    possibleDates[index].events[evIndex].color = "green";
    possibleDates[index].events[evIndex].content = "";
    setDayCounter(
      dayCounter.filter((el) => el !== possibleDates[index].key.toString())
    );
    setShowMessage(!showMessage);
  };

  const handleSave = () => {
    if (
      isSameValue(possibleDates[index].events[evIndex].content.length, value)
    ) {
      setShowMessage(!showMessage);
      return;
    }
    if (isValidValue(value)) {
      possibleDates[index].events[evIndex].content = value;
      possibleDates[index].events[evIndex].prevValue = value;
      setShowMessage(!showMessage);
      setValue("");
    } else {
      setWarning(true);
      setValue("");
    }
  };

  return (
    <>
      {showMessage ? (
        <div className="modal-content" ref={ref}>
          {warning && <Warning />}
          <Close className="close-modal" onClick={handleClose} />
          <div style={{ height: 25 }}></div>
          <input
            type="text"
            id="appointment"
            className="input"
            autoComplete="off"
            placeholder=" "
            value={value || possibleDates[index].events[evIndex].content}
            onChange={(e) => {
              handleValue(e);
            }}
          ></input>
          <div className="buttons-container">
            {edit ? (
              <button
                type="submit"
                className="btn btn-modal"
                onClick={handleSave}
              >
                Spremi
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-modal"
                onClick={addContentToEvent}
              >
                Dodaj
              </button>
            )}
            {edit ? (
              <button className="btn btn-modal red" onClick={deleteContent}>
                Izbriši
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MessagePopup;
