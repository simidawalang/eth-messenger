import React from "react";
import styles from "./button.module.css";

const Button = ({ children, className, onClick, disabled }) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
