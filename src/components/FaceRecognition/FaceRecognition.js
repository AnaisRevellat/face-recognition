import React, {useState} from "react";
import styles from "./faceRecognition.module.css";

const FaceRecognition = ({ imageUrl, box }) => {
  const [imageHeight, setImageHeight] = useState(null);

  const handleImageLoad = (event) => {
    setImageHeight(event.target.height);
  };
  return (
    <>
        <div
        className={`${styles.facerecognition_container} ${
          imageHeight && imageHeight > 300 ? styles.large_image : ""
        }`}
      >

        <div className={styles.facerecognition_container_absolute}>
        <img
            id="inputimage"
            alt=""
            src={imageUrl}
            onLoad={handleImageLoad}
          />
          <div
            className={styles.bounding_box}
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default FaceRecognition;
