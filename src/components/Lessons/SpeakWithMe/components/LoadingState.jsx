import React from 'react';
import styles from '../SpeakWithMe.module.css'; 

function LoadingState() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loaderCard}>
        <div className={styles.premiumSpinner}></div>
        <h2 className={styles.loadingTitle}>جارٍ تحميل البيانات...</h2>
        <p className={styles.loadingSubtitle}>كنوجدو ليك تجربة تعلم ذكية 🧠✨</p>
      </div>
    </div>
  );
}

export default LoadingState;