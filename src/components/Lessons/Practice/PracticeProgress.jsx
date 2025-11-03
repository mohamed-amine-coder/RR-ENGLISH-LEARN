import React from "react";
import styles from "./Practice.module.css";

const PracticeProgress = ({ step, totalSteps }) => {
  const progressPercent = (step / totalSteps) * 100;
  return (
    <div className={styles.progress}>
      <div
        className={styles.progressBar}
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
};

export default PracticeProgress;
