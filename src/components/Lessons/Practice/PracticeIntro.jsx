// import React from "react";
// import styles from "./Practice.module.css";

// const PracticeIntro = ({ title, story, image, audio, onNext }) => {
//   return (
//     <>
//       <div className={styles.cardBody}>
//         <div className={styles.instructionTitle}>{title}</div>
        
//         <div style={{width: '100%', maxWidth: '200px', marginBottom: '20px'}}>
//           <img src={image} alt="Story" style={{width: '100%', borderRadius: '16px', border: '2px solid #eee'}} />
//         </div>
        
//         <audio controls style={{width: '100%'}}>
//            <source src={audio} type="audio/mpeg" />
//         </audio>

//         <div style={{background: '#f0f7ff', padding: '20px', borderRadius: '16px', width: '100%', marginBottom: '20px'}}>
//            <p style={{fontSize: '1.1rem', lineHeight: '1.8', margin: 0, textAlign: 'center', direction: 'ltr'}}>{story}</p>
//         </div>

//       </div>

//       <div className={styles.footerArea}>
//         <div className={styles.footerContent} style={{justifyContent: 'center'}}>
//            <button className={styles.actionButton} onClick={onNext}>
//              فهمت القصة، لنبدأ التمارين
//            </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PracticeIntro;
import React from "react";
import styles from "./Practice.module.css";

const PracticeIntro = ({ title, story, image, audio, onNext }) => {
  return (
    <>
      <div className={styles.cardBody}>
        <div className={styles.instructionTitle}>{title}</div>
        
        {/* الصورة */}
        <img 
          src={image} 
          alt="Story" 
          className={styles.storyImage} /* استعملنا الكلاس الجديد */
        />
        
        {/* الصوت */}
        <audio controls className={styles.audioPlayer}>
           <source src={audio} type="audio/mpeg" />
           متصفحك لا يدعم الصوت.
        </audio>

        {/* النص */}
        <div className={styles.storyText}>
           <p style={{margin:0}}>{story}</p>
        </div>
      </div>

      <div className={styles.footerArea}>
        <div className={styles.footerContent} style={{justifyContent: 'center'}}>
           <button className={styles.actionButton} onClick={onNext}>
             فهمت القصة، لنبدأ التمارين
           </button>
        </div>
      </div>
    </>
  );
};

export default PracticeIntro;