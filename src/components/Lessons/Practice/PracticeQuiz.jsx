// Practice/PracticeQuiz.jsx
import React, { useState, useEffect } from "react";
import styles from "./Practice.module.css";
import FeedbackFooter from "./FeedbackFooter";

const PracticeQuiz = ({ questions, onNext, onAnswer }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState("idle");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (questions && questions[current]) {
       setOptions([...questions[current].options].sort(() => 0.5 - Math.random()));
    }
  }, [current, questions]);

  const handleSelection = (opt) => {
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

  // 👈 ربط زر Enter بالاستمرار
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && status !== 'idle') {
        handleContinue();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, current, questions.length]);

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
              <button 
                key={opt} 
                className={btnClass} 
                onClick={() => handleSelection(opt)} 
                disabled={status !== 'idle'}
              >
                {opt}
              </button>
             );
          })}
        </div>
      </div>

      <FeedbackFooter 
        status={status}
        correctAnswer={questions[current].answer}
        onCheck={() => {}}
        onNext={handleContinue}
        disabledCheck={!selected}
      />
    </>
  );
};
export default PracticeQuiz;