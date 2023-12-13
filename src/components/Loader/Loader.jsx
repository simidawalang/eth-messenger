import React from "react";
import { LuLoader2 } from "react-icons/lu";
import styles from "./loader.module.css";

const Loader = ({ color = "white" }) => {
  return <LuLoader2 className={styles.loader} size={18} color={color} />;
};

export default Loader;
