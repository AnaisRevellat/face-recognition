import React from "react";
import ReactDOM from "react-dom";
import styles from "./loadingModal.module.css";

const LoadingModal = () => {
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>Veuillez patienter, chargement en cours...</p>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default LoadingModal;
