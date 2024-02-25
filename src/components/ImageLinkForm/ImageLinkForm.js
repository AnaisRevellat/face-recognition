import styles from "./imageLinkForm.module.css";
import React from "react";

const ImageLinkForm = ({ onInputChange, onBtnSubmit }) => {

  const handleBtnSubmit = (event) => {
    event.preventDefault();
    onBtnSubmit();
  };

  return (
    <div className={styles.imageLinkForm_container}>
      <div className={styles.welcome_text}>
        <p>
          {"This Magic tool will detect faces in your pictures. Give it a try."}
        </p>
      </div>
      <div className={styles.input_detect}>
        <input type="text" onChange={onInputChange} />
        <a href="/" className="a_btn" onClick={handleBtnSubmit}>
          <span>
            <strong>Detect</strong>
          </span>
          <div className="liquid"></div>
        </a>
      </div>
    </div>
  );
};

export default ImageLinkForm;
