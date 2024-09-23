import React from "react";
import style from "../styles/modal.module.css";

const Modal = ({ onClose, children }) => {
  return (
    <div className={style.overlay}>
      <div className={style.content}>
        <button className={style.close} onClick={onClose}>
          &times; {/* Close icon */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
