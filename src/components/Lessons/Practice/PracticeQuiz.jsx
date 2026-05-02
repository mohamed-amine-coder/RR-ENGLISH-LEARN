import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import styles from "./Practice.module.css";

const PracticeQuiz = ({ questions, onNext, onAnswer }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState("idle");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Shuffle options only when the question changes
    if (questions && questions[current]) {
       setOptions([...questions[current].options].sort(() => 0.5 - Math.random()));
    }
  }, [current, questions]);

  const handleSelect = (opt) => {
    if (status !== "idle") return; 
    setSelected(opt);
    const isCorrect = opt === questions[current].answer;
    setStatus(isCorrect ? "correct" : "wrong");
    if (isCorrect) onAnswer();
  };

  const handleContinue = () => {
    setSelected("");
    setStatus("idle");
    if (current + 1 < questions.length) setCurrent(current + 1);
    else onNext();
  };

  return (
    <>
      <div className={styles.cardBody}>
        <div className={styles.instructionTitle}>اختر الإجابة الصحيحة</div>
        <h2 className={styles.questionText}>{questions[current].question}</h2>
        
        <div className={styles.optionsGrid}>
          {options.map((opt) => {
             let btnClass = styles.optionCard;
             if (selected === opt) btnClass += ` ${styles.selected}`;
             if (status !== 'idle' && opt === questions[current].answer) btnClass += ` ${styles.correct}`;
             if (status === 'wrong' && selected === opt) btnClass += ` ${styles.wrong}`;

             return (
              <button key={opt} className={btnClass} onClick={() => handleSelect(opt)} disabled={status !== 'idle'}>
                {opt}
              </button>
             );
          })}
        </div>
      </div>

      <div className={`${styles.footerArea} ${status !== 'idle' ? styles[status] : ''}`} style={{display: status === 'idle' ? 'none' : 'flex'}}>
        <div className={styles.footerContent}>
          <div className={styles.feedbackMessage}>
            <div className={styles.feedbackIcon} style={{color: status === 'correct' ? '#58a700' : '#ea2b2b'}}>
              {status === 'correct' ? <FaCheck /> : <FaTimes />}
            </div>
            <div className={styles.feedbackText}>
              <h3>{status === 'correct' ? 'ماعلكش' : 'إجابة خاطئة'}</h3>
              {status === 'wrong' && <p>Correct: {questions[current].answer}</p>}
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
export default PracticeQuiz;