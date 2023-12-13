import React from "react";
import styles from "./input.module.css";

const Input = ({
  id,
  className,
  value,
  label,
  onChange,
  placeholder,
  readOnly,
  disabled,
}) => {
  return (
    <div className={`${styles.input} ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
