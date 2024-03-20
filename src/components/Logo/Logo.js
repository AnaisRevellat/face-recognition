import React from "react";
import { Tilt } from "react-tilt";
import styles from "./logo.module.css";
import fRecognition from '../../assets/facial_recognition.jpeg'

const Logo = () => {    
  return (
    <Tilt className={styles.tilt} options={{max: 50}} >
      <div className={styles.logo_box}>
        <img src={fRecognition} alt="face with recognition nodes"/>
      </div>
    </Tilt>
  );
};

export default Logo;
