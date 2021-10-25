import React, { useEffect } from "react";

const ErrorPopup = ({ errorPopup, setErrorPopup }) => {
  useEffect(() => {
    setTimeout(() => {
      if (errorPopup) {
        setErrorPopup(!errorPopup);
      }
    }, 1000);
  }, [errorPopup, setErrorPopup]);

  return (
    <>
      {errorPopup && (
        <div className="modal-content">
          Nažalost, nije moguće odabrati ovaj termin
        </div>
      )}
    </>
  );
};

export default ErrorPopup;
