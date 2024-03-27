import React from "react";
import styles from './spinner.modules.css';

const Spinner = () => {
  return (
    <div className={styles.spinner_overlay}>
      <div className={styles.spinner_container} />
    </div>
  );
};

export default Spinner;
