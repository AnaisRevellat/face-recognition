import React from "react";
import { Link } from "react-router-dom";
import styles from "./navigation.module.css";
import Logo from "../Logo/Logo";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <div className={styles.nav_menu}>
        <Logo className={styles.main_logo} />
        <nav className={styles.main_nav}>
          <Link
            onClick={() => onRouteChange("signout")}
            className={styles.main_nav__link}
          >
            Sign Out
          </Link>
        </nav>
      </div>
    );
  } else {
    return (
      <div className={styles.nav_menu}>
        <Logo className={styles.main_logo} />
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
      </div>
    );
  }
};

export default Navigation;
