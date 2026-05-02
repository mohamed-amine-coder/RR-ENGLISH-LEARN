import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import styles from "./Practice.module.css";

const PracticeTF = ({ questions, onNext, onAnswer }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle");

  const handleSelect = (value) => {
    if (status !== "idle") return; 
    setSelected(value);
    const isCorrect = value === questions[current].answer;
    setStatus(isCorrect ? "correct" : "wrong");
    if (isCorrect) onAnswer();
  };

  const handleContinue = () => {
    setSelected(null);
    setStatus("idle");
    if (current + 1 < questions.length) setCurrent(current + 1);
    else onNext();
  };

  return (
    <>
      <div className={styles.cardBody}>
        <div className={styles.instructionTitle}>صحيح أم خطأ؟</div>
        <h2 className={styles.questionText} style={{direction: 'ltr'}}>{questions[current].question}</h2>
        
        <div className={styles.tfContainer}>
          <button className={`${styles.tfBtn} ${selected === true ? styles.selected : ''}`} onClick={() => handleSelect(true)} disabled={status !== 'idle'}>
            <span style={{fontSize:'2rem'}}>👍</span> True
          </button>
          <button className={`${styles.tfBtn} ${selected === false ? styles.selected : ''}`} onClick={() => handleSelect(false)} disabled={status !== 'idle'}>
            <span style={{fontSize:'2rem'}}>👎</span> False
          </button>
        </div>
      </div>

      <div className={`${styles.footerArea} ${status !== 'idle' ? styles[status] : ''}`} style={{display: status === 'idle' ? 'none' : 'flex'}}>
        <div className={styles.footerContent}>
             <div className={styles.feedbackMessage}>
               <div className={styles.feedbackIcon} style={{color: status === 'correct' ? '#58a700' : '#ea2b2b'}}>
                 {status === 'correct' ? <FaCheck /> : <FaTimes />}
               </div>
               <div className={styles.feedbackText}>
                 <h3>{status === 'correct' ? 'جواب صحيح!' : 'جواب خاطئ'}</h3>
               </div>
             </div>

            <button className={`${styles.actionButton} ${status === 'wrong' ? styles.wrongState : ''}`} onClick={handleContinue}>
              تابع
            </button>
        </div>
      </div>
    </>
  );
};
export default PracticeTF;