import React from "react";
import { Link } from "react-router-dom";
import styles from './navigation.module.css'
const Navigation = ({onRouteChange}) => {
  return (
    <nav className={styles.main_nav}>
      <Link onClick={() => onRouteChange("signin")} className={styles.main_nav__link}>Sign Out</Link>
    </nav>
  );
};

export default Navigation;
