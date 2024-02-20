import React from "react";
import { Link } from "react-router-dom";
import styles from './navigation.module.css'
const Navigation = () => {
  return (
    <nav className={styles.main_nav}>
      <Link to="/">Sign Out</Link>
    </nav>
  );
};

export default Navigation;
