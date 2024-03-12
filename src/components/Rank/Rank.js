import React from "react";
import styles from "./rank.module.css";

const Rank = ({ name, entries }) => {
  return (
    <div className={styles.rank_container}>
      <div className={styles.rank_box}>  {`${name}, your current entry count is...`}</div>
      <div className={styles.space}>{entries}</div>
    </div>
  );
};

export default Rank;
