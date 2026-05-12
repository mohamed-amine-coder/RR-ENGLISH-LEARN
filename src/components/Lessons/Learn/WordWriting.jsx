// Learn/WordWriting.jsx
import { useState, useRef, useEffect } from 'react';
import styles from './Learn.module.css';
import { FaKeyboard } from 'react-icons/fa'; // 👈 زدنا أيقونة الكلاڤي
import FeedbackFooter from './FeedbackFooter'; 

export default function WordWriting({ lesson, onComplete }) {
  const words = lesson.words;
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState("idle");
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef(null);

  const currentWord = words[index];

  useEffect(() => {
    inputRef.current?.focus();
  }, [index]);

  const handleCheck = () => {
    if (!input.trim()) return;
    const isCorrect = input.trim().toLowerCase() === currentWord.en.toLowerCase();
    
    if (isCorrect) {
      setStatus("correct");
    } else {
      setStatus("wrong");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleNext = () => {
    setInput('');
    setStatus("idle");
    if (index < words.length - 1) {
      setIndex(index + 1);
    } else {
      onComplete();
    }
  };

  return (
    <>
      <div className={styles.cardBody}>
        <div className={styles.instructionTitle}>اكتب الكلمة بالإنجليزية ✍️</div>
        
        {/* 👈 البطاقة الجديدة بستايل برتقالي/أصفر فاتح */}
        <div className={styles.wordBox} style={{
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', 
          borderColor: '#fde68a', 
          boxShadow: '0 8px 25px rgba(245, 158, 11, 0.15)'
        }}>
          <FaKeyboard className={styles.wordBoxIconBg} style={{color: 'rgba(253, 230, 138, 0.5)'}} />
          
          <div className={styles.wordBoxContent}>
            <h2 className={styles.subWord} style={{fontSize: '2.2rem', color: '#b45309', marginBottom: '30px'}}>{currentWord.darija}</h2>
            
            <input
              ref={inputRef}
              type="text"
              className={`${styles.writeInput} ${isShaking ? styles.shake : ''}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="in english"
              disabled={status === "correct"}
              onKeyDown={(e) => e.key === 'Enter' && (status === 'idle' ? handleCheck() : handleNext())}
              style={{
                borderColor: status === 'idle' ? '#fcd34d' : '', // كيبان متناسق مع البطاقة
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
              }}
            />
          </div>
        </div>
      </div>

      <FeedbackFooter 
        status={status}
        correctAnswer={currentWord.en}
        onCheck={handleCheck}
        onNext={handleNext}
        disabledCheck={!input.trim()}
      />
    </>
  );
}