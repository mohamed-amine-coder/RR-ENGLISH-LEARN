import React, { useState, useRef, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import styles from "./Practice.module.css";

const PracticeWrite = ({ questions, onNext, onAnswer }) => {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); 
  const [isShaking, setIsShaking] = useState(false); 
  const inputRef = useRef(null);

  const cleanText = (text) => text.trim().toLowerCase().replace(/[.,?!]/g, "");

  const handleCheck = () => {
    if (!input.trim()) return;
    const isCorrect = cleanText(input) === cleanText(questions[current].answer);

    if (isCorrect) {
      setStatus("correct");
      onAnswer();
    } else {
      setStatus("wrong");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500); 
    }
  };

  const handleContinue = () => {
    setInput("");
    setStatus("idle");
    if (current + 1 < questions.length) setCurrent(current + 1);
    else onNext();
  };

  useEffect(() => { inputRef.current?.focus(); }, [current]);

  return (
    <>
      <div className={styles.cardBody}>
        <div className={styles.instructionTitle}>اكتب الجواب بالإنجليزي</div>
        <h2 className={styles.questionText} style={{direction: 'rtl'}}>{questions[current].question}</h2>
        
        <input
          ref={inputRef}
          type="text"
          className={`${styles.writeInput} ${isShaking ? styles.shake : ''}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here..."
          disabled={status !== "idle"}
          onKeyDown={(e) => e.key === 'Enter' && (status === 'idle' ? handleCheck() : handleContinue())}
        />
      </div>

      <div className={`${styles.footerArea} ${status !== 'idle' ? styles[status] : ''}`}>
        <div className={styles.footerContent}>
          {status !== 'idle' ? (
            <div className={styles.feedbackMessage}>
              <div className={styles.feedbackIcon} style={{color: status === 'correct' ? '#58a700' : '#ea2b2b'}}>
                {status === 'correct' ? <FaCheck /> : <FaTimes />}
              </div>
              <div className={styles.feedbackText}>
                <h3>{status === 'correct' ? 'ممتاز!' : 'الجواب الصحيح:'}</h3>
                {status === 'wrong' && <p>{questions[current].answer}</p>}
              </div>
            </div>
          ) : <div/>}

          <button 
            className={`${styles.actionButton} ${status === 'wrong' ? styles.wrongState : ''}`} 
            onClick={status === 'idle' ? handleCheck : handleContinue}
            disabled={status === 'idle' && !input.trim()}
          >
            {status === 'idle' ? 'تحقق' : 'تابع'}
          </button>
        </div>
      </div>
    </>
  );
};
export default PracticeWrite;