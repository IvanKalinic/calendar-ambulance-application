import React, { useState, useEffect, useRef } from "react";
import { usePossibleDates } from "../../context/PossibleDates";
import { isValidValue, isSameValue, isChangingInProcess } from "../../utils";
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

  const handleValue = (e) => {
    if (
      isChangingInProcess(
        e.target.value,
        possibleDates[index].events[evIndex].content.length
      )
    ) {
      possibleDates[index].events[evIndex].content = e.target.value;
    }
    setValue(e.target.value);
  };

  const handleClose = () => {
    if (!dayCounter.length) {
      setShowMessage(!showMessage);
      return;
    }
    if (!value && !possibleDates[index].events[evIndex].content.length) {
      setWarning(true);
      return;
    }
    if (isValidValue(value)) {
      setWarning(true);
    } else {
      setShowMessage(!showMessage);
    }
  };
  const addContentToEvent = () => {
    if (isValidValue(value)) {
      possibleDates[index].events[evIndex].content = value;
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
      setShowMessage(!showMessage);
      setValue("");
    } else {
      setWarning(true);
      setValue("");
    }
  };

  //clicking outside of popup
  useEffect(() => {
    const onBodyClicked = (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }
      if (showMessage && possibleDates[index].events[evIndex].content !== "") {
        setShowMessage(!showMessage);
        return;
      }
      if (showMessage && !value) {
        setShowMessage(true);
        setWarning(true);
        return;
      }
    };
    document.body.addEventListener("click", onBodyClicked, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClicked);
    };
  }, [showMessage]);

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
            onChange={(e) => handleValue(e)}
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
