import React from "react";
import { Link } from "react-router-dom";
import styles from "./navigation.module.css";
const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className={styles.main_nav}>
        <Link
          onClick={() => onRouteChange("signout")}
          className={styles.main_nav__link}
        >
          Sign Out
        </Link>
      </nav>
    );
  } else {
    return (
      <>
        <nav className={styles.main_nav}>
          <Link
            onClick={() => onRouteChange("signin")}
            className={styles.main_nav__link}
          >
            Sign In
          </Link>
          <Link
            onClick={() => onRouteChange("register")}
            className={styles.main_nav__link}
          >
            Register
          </Link>
        </nav>
      </>
    );
  }
};

export default Navigation;
