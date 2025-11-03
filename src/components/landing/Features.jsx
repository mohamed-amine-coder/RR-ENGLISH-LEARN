import React from "react";
import { FaBook, FaPlayCircle, FaChartLine } from "react-icons/fa";
import styles from "./Features.module.css";

export default function Features() {
  return (
    <section id="features" className={styles.features}>
      <div className={styles.feature}>
        <FaBook size={40} color="var(--orange)" />
        <h3>تعلم المفردات</h3>
        <p>دروس ممتعة مع كلمات جديدة يومياً.</p>
      </div>
      <div className={styles.feature}>
        <FaPlayCircle size={40} color="var(--green)" />
        <h3>قصص صوتية</h3>
        <p>استمع وتعلم اللغة بطريقة طبيعية.</p>
      </div>
      <div className={styles.feature}>
        <FaChartLine size={40} color="var(--blue)" />
        <h3>متابعة التقدم</h3>
        <p>شوف تطور مستواك خطوة بخطوة.</p>
      </div>
    </section>
  );
}
