import React from "react";
import styles from "./faceRecognition.module.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className={styles.imageDetected_container}>
      <img id="inputimage" src={imageUrl} alt="" />
      <div
        className={styles.recognition_border}
        style={{
          top: box.topRow,
          right: box.rightCol,
          bottom: box.bottomRow,
          left: box.leftCol,
        }}
      ></div>
    </div>
  );
};

export default FaceRecognition;
