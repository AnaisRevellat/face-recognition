import React from "react";
import styles from "./register.module.css";

const Register = ({ onRouteChange }) => {

  const handleSubmit = (event) => {
    event.preventDefault();  // Empêche le rechargement de la page
    onRouteChange("home");
  };

  return (
    <div className={styles.form_container}>
      <div className={styles.sign_form}>
        <h2>Register</h2>
        <div className={styles.sign_form__subdiv}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className={styles.sign_form__subdiv}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className={styles.sign_form__subdiv}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button className={styles.register_btn} type="submit" onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
};

export default Register;