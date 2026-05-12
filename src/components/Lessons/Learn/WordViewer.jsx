// Learn/WordViewer.jsx
import { useState, useEffect } from 'react';
import styles from './Learn.module.css';
import { FaVolumeUp, FaLanguage } from 'react-icons/fa'; // 👈 زدنا أيقونة اللغة

export default function WordViewer({ lesson, onComplete }) {
  const words = lesson.words;
  const [index, setIndex] = useState(0);
  const [englishVoices, setEnglishVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      const goodVoices = allVoices.filter(v => 
        v.lang.startsWith("en") && 
        (v.name.includes("Google") || v.name.includes("Microsoft") || v.name.includes("Apple") || v.name.includes("Samantha") || v.name.includes("Daniel"))
      );
      setEnglishVoices(goodVoices.length > 0 ? goodVoices : allVoices.filter(v => v.lang.startsWith("en")));
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleSpeak = (text) => {
    window.speechSynthesis.cancel(); 
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.85; 

    if (englishVoices.length > 0) {
      const randomVoice = englishVoices[Math.floor(Math.random() * englishVoices.length)];
      utter.voice = randomVoice;
    }
    window.speechSynthesis.speak(utter);
  };

  const handleNext = () => {
    if (index < words.length - 1) setIndex(index + 1);
    else onComplete();
  };

  const word = words[index];

  return (
    <>
      <div className={styles.cardBody}>
        <div className={styles.instructionTitle}>كلمات جديدة ✨</div>
        
        {/* 👈 هنا استعملنا البطاقة الجديدة */}
        <div className={styles.wordBox}>
          <FaLanguage className={styles.wordBoxIconBg} /> {/* أيقونة فالخلفية */}
          
          <div className={styles.wordBoxContent}>
            <div className={styles.speakerBtn} onClick={() => handleSpeak(word.en)}>
               <FaVolumeUp />
            </div>
            
            <h1 className={styles.mainWord}>{word.en}</h1>
            <h2 className={styles.subWord}>{word.darija}</h2>
            <p style={{color: '#64748b', marginTop: '10px', fontWeight: '800', fontSize: '1.1rem'}}>
              النطق: <span style={{color: '#0ea5e9'}}>[ {word.pronunciation} ]</span>
            </p>
          </div>
        </div>
      </div>

      <div className={styles.footerArea}>
        <div className={styles.footerContent} style={{justifyContent: 'center'}}>
          <button 
            className={styles.actionButton} 
            onClick={handleNext}
            style={{ width: '100%', maxWidth: '300px' }}
          >
            تابع
          </button>
        </div>
      </div>
    </>
  );
}