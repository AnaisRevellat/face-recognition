import React from "react";
import styles from "./faceRecognition.module.css";
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <>
    <div className={styles.facerecognition_container}>
      <div className={styles.facerecognition_container_absolute}>
        <img id='inputimage' alt='' src={imageUrl}/>
        <div className={styles.bounding_box} style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
    </>
  );
};

export default FaceRecognition;
