import React, { useState, useEffect, useRef } from "react";
import { useReservedDate } from "../../context/ReservedDate";
import { isValidValue, isSameValue, isChangingInProcess } from "../../utils";
import Warning from "../Warning";
import { Close } from "../../assets/icons";
import "./index.scss";

const MessagePopup = ({ showMessage, setShowMessage }) => {
  const [value, setValue] = useState("");
  const [warning, setWarning] = useState(false);
  const { reservedDate, dayCounter, setDayCounter, current } =
    useReservedDate();
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
        reservedDate[index].events[evIndex].content.length
      )
    ) {
      reservedDate[index].events[evIndex].content = e.target.value;
    }
    setValue(e.target.value);
  };

  const handleClose = () => {
    if (!dayCounter.length) {
      setShowMessage(!showMessage);
      return;
    }
    if (!value && !reservedDate[index].events[evIndex].content.length) {
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
    if (
      isSameValue(reservedDate[index].events[evIndex].content.length, value)
    ) {
      setShowMessage(!showMessage);
      return;
    }
    if (isValidValue(value)) {
      reservedDate[index].events[evIndex].content = value;
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
      if (showMessage && reservedDate[index].events[evIndex].content !== "") {
        setShowMessage(!showMessage);
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
          <Close className="close-modal" onClick={() => handleClose()} />
          <div style={{ height: 25 }}></div>
          <input
            type="text"
            id="appointment"
            className="input"
            autoComplete="off"
            placeholder=" "
            value={value || reservedDate[index].events[evIndex].content}
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
