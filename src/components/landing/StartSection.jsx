import React from "react";
import { Link } from "react-router-dom";
import { FaBookOpen, FaBrain } from "react-icons/fa";
import styles from "./StartSection.module.css";

export default function StartSection() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>أهلا بك فـ RR-English!</h2>
      <p className={styles.subtitle}>
        جاهز تبدا رحلتك فتعلم الإنجليزية بطريقة سهلة وممتعة؟
      </p>

      <div className={styles.buttons}>
        <Link to="/lessons/learn">
          <button className={styles.button}>
            <FaBookOpen className={styles.icon} />
            تعلم المفردات
          </button>
        </Link>
        <Link to="/lessons/practice">
          <button className={styles.button}>
            <FaBrain className={styles.icon} />
            طبق اللي تعلمتي
          </button>
        </Link>
      </div>

      <p className={styles.motivation}>
        خطوة بخطوة، غادي تولي محترف فـ الإنجليزية 💪
      </p>
    </div>
  );
}
