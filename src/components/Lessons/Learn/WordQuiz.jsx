// Learn/WordQuiz.jsx
import { useState, useEffect } from 'react';
import styles from './Learn.module.css';
import { FaCheck, FaTimes, FaQuestionCircle } from 'react-icons/fa'; // 👈 زدنا أيقونة السؤال

export default function WordQuiz({ lesson, onComplete }) {
  const words = lesson.words;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle");
  const [options, setOptions] = useState([]);

  const currentWord = words[index];

  useEffect(() => {
    if (currentWord) {
      const distractors = words
        .map(w => w.darija)
        .filter(d => d !== currentWord.darija)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
        
      setOptions([currentWord.darija, ...distractors].sort(() => 0.5 - Math.random()));
    }
  }, [index, currentWord, words]);

  const handleSelect = (opt) => {
    if (status !== "idle") return;
    setSelected(opt);
    const isCorrect = opt === currentWord.darija;
    setStatus(isCorrect ? "correct" : "wrong");
  };

  const handleNext = () => {
    setSelected(null);
    setStatus("idle");
    if (index < words.length - 1) setIndex(index + 1);
    else onComplete();
  };

  return (
    <>
      <div className={styles.cardBody}>
        <div className={styles.instructionTitle}>أشنو كتعني هاد الكلمة؟ 🤔</div>
        
        {/* 👈 البطاقة الجديدة بستايل الأخضر الفاتح */}
        <div className={styles.wordBox} style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', 
          borderColor: '#bbf7d0', 
          boxShadow: '0 8px 25px rgba(34, 197, 94, 0.15)'
        }}>
          <FaQuestionCircle className={styles.wordBoxIconBg} style={{color: 'rgba(187, 247, 208, 0.5)'}} />
          
          <div className={styles.wordBoxContent}>
            <h2 className={styles.mainWord} style={{marginBottom: '30px', color: '#166534'}}>{currentWord.en}</h2>

            <div className={styles.optionsGrid}>
              {options.map((opt, i) => {
                let btnClass = styles.optionCard;
                if (selected === opt) btnClass += ` ${styles.selected}`;
                if (status !== 'idle' && opt === currentWord.darija) btnClass += ` ${styles.correct}`;
                if (status === 'wrong' && selected === opt) btnClass += ` ${styles.wrong}`;

                return (
                  <button key={i} className={btnClass} onClick={() => handleSelect(opt)} disabled={status !== 'idle'}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.footerArea} ${status !== 'idle' ? styles[status] : ''}`} style={{display: status === 'idle' ? 'none' : 'flex'}}>
        <div className={styles.footerContent}>
          <div className={styles.feedbackMessage}>
             <div className={styles.feedbackIcon} style={{color: status === 'correct' ? '#58a700' : '#ea2b2b'}}>
               {status === 'correct' ? <FaCheck /> : <FaTimes />}
             </div>
             <div className={styles.feedbackText}>
               <h3>{status === 'correct' ? 'ماعندي مانتسالك! 👏' : 'ماشي مشكل، ركز كثر!'}</h3>
               {status === 'wrong' && <p>الجواب الصحيح: {currentWord.darija}</p>}
             </div>
          </div>
          <button className={`${styles.actionButton} ${status === 'wrong' ? styles.wrongState : ''}`} onClick={handleNext}>
            تابع
          </button>
        </div>
      </div>
    </>
  );
}