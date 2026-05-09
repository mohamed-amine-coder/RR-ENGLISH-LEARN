// Learn/WordWriting.jsx
import { useState, useRef, useEffect } from 'react';
import styles from './Learn.module.css';
import FeedbackFooter from './FeedbackFooter'; // 👈 استدعاء الفوتر الجديد

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
        <div className={styles.instructionTitle}>اكتب الكلمة بالإنجليزية</div>
        <h2 className={styles.subWord}>{currentWord.darija}</h2>
        
        <input
          ref={inputRef}
          type="text"
          className={`${styles.writeInput} ${isShaking ? styles.shake : ''}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب هنا..."
          disabled={status === "correct"}
          onKeyDown={(e) => e.key === 'Enter' && (status === 'idle' ? handleCheck() : handleNext())}
        />
      </div>

      {/* 👈 هنا استخدمنا المكون الجديد، الكود ولا نقي ومختصر! */}
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