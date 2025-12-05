import React from "react";
import { FaTrophy } from "react-icons/fa";
import styles from "./Practice.module.css";

const PracticeResult = ({ score, total, onNext }) => {
  const percentage = Math.round((score / total) * 100);

  return (
    <>
      <div className={styles.cardBody}>
        <FaTrophy size={80} color="#ffc107" style={{marginBottom: '20px'}} />
        <h2 style={{fontSize: '2rem', marginBottom: '10px', color: 'var(--primary-color)'}}>أكملت الدرس!</h2>
        
        <div style={{background: '#f7f7f7', padding: '30px', borderRadius: '20px', width: '100%', marginTop: '20px'}}>
           <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
              <div style={{textAlign: 'center'}}>
                 <div style={{fontSize: '1rem', color: '#666'}}>النتيجة</div>
                 <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success-color)'}}>{score} / {total}</div>
              </div>
              <div style={{textAlign: 'center'}}>
                 <div style={{fontSize: '1rem', color: '#666'}}>الدقة</div>
                 <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary-color)'}}>{percentage}%</div>
              </div>
           </div>
        </div>
      </div>

      <div className={styles.footerArea}>
        <div className={styles.footerContent} style={{justifyContent: 'center'}}>
          <button className={styles.actionButton} onClick={onNext}>
            الدرس التالي
          </button>
        </div>
      </div>
    </>
  );
};

export default PracticeResult;