import React from "react";
import { useHistory } from "react-router-dom";

const Popup = ({ message, onClose }) => {
  const history = useHistory();
  const handleOkClick = () => {
    history.push("/history/history-all");
    onClose();
  };
  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="popup-message">{message}</div>
        <button className="popup-close-btn" onClick={handleOkClick}>
          ok
        </button>
      </div>
    </div>
  );
};

export default Popup;
