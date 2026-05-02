import React from "react";
import styles from "./Practice.module.css";

const PracticeIntro = ({ title, story, image, audio, onNext }) => {
  return (
    <>
      <div className={styles.cardBody}>
        <div className={styles.instructionTitle}>{title}</div>
        <img src={image} alt="Story" style={{width: '100%', maxWidth: '300px', borderRadius: '16px', marginBottom: '20px', border: '2px solid #eee'}} />
        
        <audio controls style={{width: '100%', maxWidth: '300px', marginBottom: '20px', outline: 'none'}}>
           <source src={audio} type="audio/mpeg" />
        </audio>

        <div style={{background: '#f0f7ff', padding: '20px', borderRadius: '16px', width: '100%', maxWidth: '400px'}}>
           <p style={{fontSize: '1.2rem', lineHeight: '1.8', margin: 0, textAlign: 'left', direction: 'ltr', color: '#333'}}>
             {story}
           </p>
        </div>
      </div>

      <div className={styles.footerArea}>
        <div className={styles.footerContent} style={{justifyContent: 'center'}}>
           <button className={styles.actionButton} onClick={onNext}>
             فهمت القصة، لنبدأ
           </button>
        </div>
      </div>
    </>
  );
};
export default PracticeIntro;