import React, { useState } from "react";
import "./index.scss";

const MessagePopup = ({ showMessage, setShowMessage }) => {
  const [value, setValue] = useState();

  return (
    <>
      {showMessage ? (
        <div className="form">
          <input
            type="text"
            id="appointment"
            className="form__input"
            autoComplete="off"
            placeholder=" "
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></input>
          <button>Add</button>
        </div>
      ) : null}
    </>
  );
};

export default MessagePopup;
