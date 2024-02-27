import React from "react";
import styles from "./signin.module.css";

const Signin = ({onRouteChange}) => {
  return (  
    <div className={styles.form_container}>
      <div className={styles.sign_form}>
      <h2>Sign In</h2>
        <div className={styles.sign_form__subdiv}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className={styles.sign_form__subdiv}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>       
        <button onClick={() => onRouteChange("home")} type="submit">Sign in</button>
        <div className={styles.sign_form__subdiv}>
          <p onClick={() => onRouteChange('register')} href="#0">Register</p>     
        </div>
      </div>
    </div>
  );
};

export default Signin;
