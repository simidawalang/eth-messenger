import React from "react";
import styles from "./input.module.css";

const Input = ({
  id,
  className,
  value,
  label,
  onChange,
  onFocus,
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
        onFocus={onFocus}
      />
    </div>
  );
};

export default Input;
