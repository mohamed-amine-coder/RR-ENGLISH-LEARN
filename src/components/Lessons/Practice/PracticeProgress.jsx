// import React from "react";
// import styles from "./Practice.module.css";

// const PracticeProgress = ({ step, totalSteps }) => {
//   const progressPercent = (step / totalSteps) * 100;
//   return (
//     <div className={styles.progress}>
//       <div
//         className={styles.progressBar}
//         style={{ width: `${progressPercent}%` }}
//       />
//     </div>
//   );
// };

// export default PracticeProgress;


// PracticeProgress.jsx
import React from "react";
import styles from "./Practice.module.css";

const PracticeProgress = ({ step, totalSteps }) => {
  const progressPercent = (step / totalSteps) * 100;
  
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className={styles.progressText}>
        <span>التقدم: {step} من {totalSteps}</span>
        <span>{progressPercent.toFixed(0)}%</span>
      </div>
    </div>
  );
};

export default PracticeProgress;