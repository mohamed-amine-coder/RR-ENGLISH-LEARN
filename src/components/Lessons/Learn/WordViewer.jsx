// import { useState } from 'react';
// import styles from './Learn.module.css';
// import { FaVolumeUp } from 'react-icons/fa';

// export default function WordViewer({ lesson, onComplete }) {
//   const words = lesson.words;
//   const [index, setIndex] = useState(0);

//   const handleSpeak = (text) => {
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = "en-US";
    
//     // 1. تعديل السرعة (0.8 كتعني ثقيلة شوية)
//     utter.rate = 0.7; 

//     // 2. محاولة تغيير الصوت
//     // تنبيه: هادشي كيعتمد على الأصوات المثبتة فجهاز المستخدم
//     const voices = window.speechSynthesis.getVoices();
    
//     // كنقلبو على صوت إنجليزي آخر من غير "Google US English" الافتراضي
//     // مثلاً، كنقلبو على صوت سميتو "Microsoft" أو غيره
//     const preferredVoice = voices.find(v => v.lang === "en-US" && !v.name.includes("Google"));
    
//     if (preferredVoice) {
//       utter.voice = preferredVoice;
//     }

//     speechSynthesis.speak(utter);
//   };

//   const handleNext = () => {
//     if (index < words.length - 1) setIndex(index + 1);
//     else onComplete();
//   };

//   const word = words[index];

//   return (
//     <>
//       <div className={styles.cardBody}>
//         <div className={styles.instructionTitle}>كلمات جديدة</div>
        
//         <div className={styles.speakerBtn} onClick={() => handleSpeak(word.en)}>
//            <FaVolumeUp />
//         </div>
        
//         <h1 className={styles.mainWord}>{word.en}</h1>
//         <h2 className={styles.subWord}>{word.darija}</h2>
        
//         <p style={{color: '#888', marginTop: '20px'}}>النطق: /{word.pronunciation}/</p>
//       </div>

//       <div className={styles.footerArea}>
//         <div className={styles.footerContent} style={{justifyContent: 'center'}}>
//           <button className={styles.actionButton} onClick={handleNext}>
//             التالي
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

import { useState } from 'react';
import styles from './Learn.module.css';
import { FaVolumeUp } from 'react-icons/fa';

export default function WordViewer({ lesson, onComplete }) {
  const words = lesson.words;
  const [index, setIndex] = useState(0);

  const handleSpeak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.7; 
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang === "en-US" && !v.name.includes("Google"));
    if (preferredVoice) utter.voice = preferredVoice;
    speechSynthesis.speak(utter);
  };

  const handleNext = () => {
    if (index < words.length - 1) setIndex(index + 1);
    else onComplete();
  };

  const word = words[index];

  return (
    <>
      <div className={styles.cardBody}>
        <div className={styles.instructionTitle}>كلمات جديدة</div>
        <div className={styles.speakerBtn} onClick={() => handleSpeak(word.en)}>
           <FaVolumeUp />
        </div>
        <h1 className={styles.mainWord}>{word.en}</h1>
        <h2 className={styles.subWord}>{word.darija}</h2>
        <p style={{color: '#a0aab5', marginTop: '20px', fontWeight: 'bold'}}>النطق: /{word.pronunciation}/</p>
      </div>
      <div className={styles.footerArea}>
        <div className={styles.footerContent} style={{justifyContent: 'center'}}>
          <button className={styles.actionButton} onClick={handleNext}>تابع</button>
        </div>
      </div>
    </>
  );
}