import React from "react";
import styles from "./register.module.css";

const Register = ({ onRouteChange }) => {
  return (
    <div className={styles.form_container}>
      <form className={styles.sign_form}>
        <h2>Register</h2>
        <div className={styles.sign_form__subdiv}>
          <label>Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className={styles.sign_form__subdiv}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className={styles.sign_form__subdiv}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button onClick={() => onRouteChange("home")} type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Register;
