// Learn/SentenceViewer.jsx
import { useState } from 'react';
import styles from './Learn.module.css';
import { FaVolumeUp } from 'react-icons/fa';

export default function SentenceViewer({ lesson, onComplete }) {
  const sentences = lesson.sentences;
  const [index, setIndex] = useState(0);

  const handleSpeak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.7; 
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang === "en-US" && !v.name.includes("Google"));
    if (preferredVoice) utter.voice = preferredVoice;
    window.speechSynthesis.speak(utter);
  };

  const handleNext = () => {
    if (index < sentences.length - 1) setIndex(index + 1);
    else onComplete();
  };

  const current = sentences[index];
  return (
    <>
      <div className={styles.cardBody}>
        <div className={styles.instructionTitle}>جمل تطبيقية</div>
        
        <div className={styles.speakerBtn} onClick={() => handleSpeak(current.en)}>
           <FaVolumeUp />
        </div>
        
        <p className={styles.sentenceText}>"{current.en}"</p>
        <h3 className={styles.subWord} style={{fontWeight: 'normal'}}>{current.darija}</h3>
      </div>

      <div className={styles.footerArea}>
        <div className={styles.footerContent} style={{justifyContent: 'center'}}>
          <button 
            className={styles.actionButton} 
            onClick={handleNext}
            style={{ width: '100%', maxWidth: '300px' }} /* توحيد حجم الزر مع باقي المكونات */
          >
            تابع
          </button>
        </div>
      </div>
    </>
  );
}