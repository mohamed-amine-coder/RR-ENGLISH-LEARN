// Learn/SentenceViewer.jsx
import { useState, useEffect } from 'react';
import styles from './Learn.module.css';
import { FaVolumeUp } from 'react-icons/fa';

export default function SentenceViewer({ lesson, onComplete }) {
  const sentences = lesson.sentences;
  const [index, setIndex] = useState(0);

  // 1. حالة (State) لتخزين الأصوات الإنجليزية
  const [englishVoices, setEnglishVoices] = useState([]);

  // 2. تحميل الأصوات وعزل الأصوات ذات الجودة العالية
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
    // توقيف أي صوت كان خدام باش ما يتخلطوش
    window.speechSynthesis.cancel(); 

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.85; // سرعة 0.85 كتكون طبيعية ومفهومة فالجمل
    
    // 3. اختيار صوت عشوائي من الأصوات المزيانة
    if (englishVoices.length > 0) {
      const randomVoice = englishVoices[Math.floor(Math.random() * englishVoices.length)];
      utter.voice = randomVoice;
    }

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