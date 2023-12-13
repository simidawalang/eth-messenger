import React from "react";
import styles from "./button.module.css";

const Button = ({ children, className, onClick }) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
