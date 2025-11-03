import React from "react";
import { FaStar } from "react-icons/fa";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.testimonials}>
      <h2>ماذا يقول المتعلمون؟</h2>
      <div>
        <div className={styles["testimonial-card"]}>
          <p>منصة رائعة وسهلة!</p>
          <FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" />
          <p>- أحمد</p>
        </div>
        <div className={styles["testimonial-card"]}>
          <p>استمتعت بكل درس!</p>
          <FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" />
          <p>- ليلى</p>
        </div>
      </div>
    </section>
  );
}
