// Learn/SentenceViewer.jsx
import { useState, useEffect } from 'react';
import styles from './Learn.module.css';
import { FaVolumeUp, FaQuoteLeft } from 'react-icons/fa'; // 👈 زدنا أيقونة الإقتباس

export default function SentenceViewer({ lesson, onComplete }) {
  const sentences = lesson.sentences;
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
    if (index < sentences.length - 1) setIndex(index + 1);
    else onComplete();
  };

  const current = sentences[index];
  
  return (
    <>
      <div className={styles.cardBody}>
        <div className={styles.instructionTitle}>جمل تطبيقية 💡</div>
        
        {/* 👈 تطبيق البطاقة الجديدة */}
        <div className={styles.wordBox} style={{background: 'linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)', borderColor: '#f5d0fe', boxShadow: '0 8px 25px rgba(217, 70, 239, 0.15)'}}>
          <FaQuoteLeft className={styles.wordBoxIconBg} style={{color: 'rgba(245, 208, 254, 0.5)'}} /> {/* لون أيقونة مختلف شويا للجمل */}
          
          <div className={styles.wordBoxContent}>
            <div className={styles.speakerBtn} onClick={() => handleSpeak(current.en)} style={{background: '#d946ef', borderBottomColor: '#c026d3', boxShadow: '0 4px 10px rgba(217, 70, 239, 0.2)'}}>
               <FaVolumeUp />
            </div>
            
            <p className={styles.sentenceText}>"{current.en}"</p>
            <h3 className={styles.subWord} style={{fontWeight: 'normal', color: '#86198f'}}>{current.darija}</h3>
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