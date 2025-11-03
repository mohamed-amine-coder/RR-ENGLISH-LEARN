import React from "react";
import { FaBook, FaPen, FaHeadphones, FaComments } from "react-icons/fa";
import styles from "./Methodology.module.css";

export default function Methodology() {
  return (
    <section className={styles.methodology}>
      <h2>كيفاش كتتعلم مع RR-English</h2>
      <p className={styles.description}>
        باش تتعلم أي لغة، خاصك تمارس <strong>4 مهارات رئيسية</strong>: القراءة، الكتابة، الاستماع، والتحدث. وهاد الشي بالضبط هو لي كتوفرو ليك المنصة.
      </p>

      <div className={styles.skills}>
        <div className={styles.skill}>
          <FaBook size={40} color="#f97316" />
          <h3>القراءة</h3>
          <p>اقرا نصوص وقصص باش تفهم الكلمات والجمل فالواقع.</p>
        </div>
        <div className={styles.skill}>
          <FaPen size={40} color="#22c55e" />
          <h3>الكتابة</h3>
          <p>كتب جملك وفقرات قصيرة لتقوية التعبير الكتابي ديالك.</p>
        </div>
        <div className={styles.skill}>
          <FaHeadphones size={40} color="#3b82f6" />
          <h3>الاستماع</h3>
          <p>استمع للقصص والتسجيلات باش تفهم النطق وتتمرن على الاستماع.</p>
        </div>
        <div className={styles.skill}>
          <FaComments size={40} color="#f43f5e" />
          <h3>التحدث</h3>
          <p>تمرن على النطق والجمل باش تولي قادر تهدر بالإنجليزية بثقة.</p>
        </div>
      </div>

      <div className={styles.sections}>
        <div className={styles.section}>
          <h3>Learn / تعلم</h3>
          <p>هنا كتكتسب الكلمات والقواعد بطريقة سهلة وممتعة.</p>
        </div>
        <div className={styles.section}>
          <h3>طبق / Practice</h3>
          <p>كتلقى نصوص، تسجيلات، قصص، كويزات وتمارين باش تطبق اللي تعلمتيه.</p>
        </div>
      </div>
    </section>
  );
}
