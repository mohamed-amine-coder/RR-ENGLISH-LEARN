// Practice/PracticeIntro.jsx
import React from "react";
import styles from "./Practice.module.css";
import CustomAudioPlayer from "./CustomAudioPlayer"; 

const PracticeIntro = ({ title, story, image, audio, onNext }) => {
  return (
    <>
      <div className={styles.cardBody}>
        <div className={styles.instructionTitle}>{title}</div>
        
        {/* الحاوية الجديدة التي تعرض المحتوى بشكل عريض */}
        <div className={styles.introLayout}>
          
          {/* العمود الأول: الصورة والمشغل الصوتي */}
          <div className={styles.mediaColumn}>
            <img src={image} alt="Story" className={styles.introImage} />
            <div className={styles.audioWrapper}>
               <CustomAudioPlayer audioSrc={audio} />
            </div>
          </div>

          {/* العمود الثاني: نص القصة */}
          <div className={styles.textColumn}>
             <p className={styles.introStoryText}>
               {story}
             </p>
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
             فهمت القصة، لنبدأ
           </button>
        </div>
      </div>
    </>
  );
};
export default PracticeIntro;