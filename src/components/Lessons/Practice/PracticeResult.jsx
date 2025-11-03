import React from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "./Practice.module.css";

const PracticeResult = ({ score, total, onNext }) => {
  return (
    <div className={styles.result}>
      <h2>نتيجتك: {score} / {total}</h2>
      <button className={styles.nextBtn} onClick={onNext}>
        الدرس الموالي <FaArrowRight />
      </button>
    </div>
  );
};

export default PracticeResult;
