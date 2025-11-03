import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles["social-icons"]}>
        <FaFacebook size={24} />
        <FaInstagram size={24} />
        <FaLinkedin size={24} />
      </div>
      <p>© 2025 RR-English</p>
    </footer>
  );
}
