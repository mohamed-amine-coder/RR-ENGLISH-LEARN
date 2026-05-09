// Practice/FeedbackFooter.jsx
import React from 'react';
import styles from './Practice.module.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function FeedbackFooter({ status, correctAnswer, onCheck, onNext, disabledCheck }) {
  if (status === 'idle') {
    return (
      <div className={styles.footerArea}>
        <div className={styles.footerContent}>
          <div /> 
          <button 
            className={styles.actionButton} 
            onClick={onCheck}
            disabled={disabledCheck}
          >
            تحقق
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.footerArea} ${styles[status]}`}>
      <div className={styles.footerContent}>
        <div className={styles.feedbackMessage}>
          <div className={styles.feedbackIcon} style={{ color: status === 'correct' ? '#58a700' : '#ea2b2b' }}>
            {status === 'correct' ? <FaCheck /> : <FaTimes />}
          </div>
          <div className={styles.feedbackText}>
            <h3>{status === 'correct' ? 'عمل ممتاز!' : 'الجواب الصحيح:'}</h3>
            {status === 'wrong' && <p>{correctAnswer}</p>}
          </div>
        </div>
        
        <button 
          className={`${styles.actionButton} ${status === 'wrong' ? styles.wrongState : ''}`} 
          onClick={onNext}
        >
          تابع
        </button>
      </div>
    </div>
  );
}