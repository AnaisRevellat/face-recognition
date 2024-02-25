import React from "react";
import styles from "./rank.module.css";

const Rank = () => {
  return (
    <div className={styles.rank_container}>
      <div className={styles.rank_box}>{'X your current rank is: '}</div>
      <div className={styles.space}>
        {'#5'}
      </div>     
    </div>
  );
};

export default Rank;
