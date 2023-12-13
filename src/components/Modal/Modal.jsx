import React from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import styles from "./modal.module.css";

const Modal = ({ children, closeModal, title }) => {
  return createPortal(
    <div className={`${styles.modal}`}>
      <div className={styles["modal-body"]}>
        <div className={styles["modal-header"]}>
          <h3>{title}</h3>{" "}
          <button
            className={styles["modal-close__btn"]}
            onClick={() => closeModal()}
          >
            <IoMdClose size={18} />
          </button>
        </div>
        <div className={styles["modal-content"]}>{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
