import React from "react";
import style from "./modal.module.css"; // Ensure the path is correct

const Modal = ({ onClose, children }) => {
  return (
    <div className={style.overlay}>
      <div className={style.content}>
        <button className={style.closeBtn} onClick={onClose}>
          &times; {/* Close icon */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
