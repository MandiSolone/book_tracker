import React from "react";
import style from "./modal.module.css";

const Modal = ({ onClose, onConfirm, children, showConfirm }) => {
  return (
    <div className={style.overlay}>
      <div className={style.content}>
        <button className={style.closeBtn} onClick={onClose}>
          &times; {/* Close icon */}
        </button>
        {children}
        {showConfirm && (
          <div>
            <button onClick={onConfirm}>Confirm</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
