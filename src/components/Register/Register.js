import React from "react";
import styles from "./register.module.css";

const Register = ({ onRouteChange }) => {

  const handleSubmit = (event) => {
    event.preventDefault();  // Empêche le rechargement de la page
    onRouteChange("home");
  };

  return (
    <div className={styles.form_container}>
      <div className={styles.sign_form} onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className={styles.sign_form__subdiv}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className={styles.sign_form__subdiv}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Register</button>
      </div>
    </div>
  );
};

export default Register;