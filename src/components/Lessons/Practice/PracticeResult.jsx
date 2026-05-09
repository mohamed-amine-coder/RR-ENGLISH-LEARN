import React from "react";
import { FaTrophy } from "react-icons/fa";
import styles from "./Practice.module.css";

const PracticeResult = ({ score, total, onNext }) => {
  const percentage = Math.round((score / total) * 100);

  return (
    <>
      <div className={styles.cardBody}>
        <FaTrophy size={80} color="#ffc107" style={{marginBottom: '20px'}} />
        <h2 style={{fontSize: '2.2rem', marginBottom: '10px', color: '#3c3c3c'}}>أكملت التمارين!</h2>
        
        <div style={{background: '#f7f7f7', padding: '30px', borderRadius: '20px', width: '100%', marginTop: '20px', border: '2px solid #e5e5e5'}}>
           <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
              <div style={{textAlign: 'center'}}>
                 <div style={{fontSize: '1.2rem', color: '#777', fontWeight: 'bold'}}>النتيجة</div>
                 <div style={{fontSize: '2rem', fontWeight: '900', color: '#58cc02'}}>{score} / {total}</div>
              </div>
              <div style={{textAlign: 'center'}}>
                 <div style={{fontSize: '1.2rem', color: '#777', fontWeight: 'bold'}}>الدقة</div>
                 <div style={{fontSize: '2rem', fontWeight: '900', color: '#1cb0f6'}}>{percentage}%</div>
              </div>
           </div>
        </div>
      </div>

      <div className={styles.footerArea}>
        <div className={styles.footerContent} style={{justifyContent: 'center'}}>
          <button 
            className={styles.actionButton} 
            onClick={onNext}
            style={{ width: '100%', maxWidth: '300px' }}
          >
            التمرين التالي
          </button>
        </div>
      </div>
    </>
  );
};

export default PracticeResult;