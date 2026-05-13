// Practice/PracticeTF.jsx
import React, { useState, useEffect } from "react";
import styles from "./Practice.module.css";
import FeedbackFooter from "./FeedbackFooter";

const PracticeTF = ({ questions, onNext, onAnswer }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle");

  const handleSelection = (choice) => {
    if (status !== "idle") return; 
    setSelected(choice);
    
    const isCorrect = choice === questions[current].answer;
    setStatus(isCorrect ? "correct" : "wrong");
    if (isCorrect) onAnswer();
  };

  const handleContinue = () => {
    setSelected(null);
    setStatus("idle");
    if (current + 1 < questions.length) setCurrent(current + 1);
    else onNext();
  };

  // 👈 إضافة التصنت لزر Enter باش يدوز للسؤال التالي
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
        <div className={styles.instructionTitle}>صحيح أم خطأ؟</div>
        <h2 className={styles.questionText} style={{direction: 'ltr'}}>{questions[current].question}</h2>
        
        <div className={styles.tfContainer}>
          <button 
            className={`${styles.tfBtn} ${selected === true ? styles.selected : ''} ${status !== 'idle' && questions[current].answer === true ? styles.correct : ''} ${status === 'wrong' && selected === true ? styles.wrong : ''}`} 
            onClick={() => handleSelection(true)} 
            disabled={status !== 'idle'}
          >
            <span style={{fontSize:'2rem'}}>👍</span> True
          </button>
          <button 
            className={`${styles.tfBtn} ${selected === false ? styles.selected : ''} ${status !== 'idle' && questions[current].answer === false ? styles.correct : ''} ${status === 'wrong' && selected === false ? styles.wrong : ''}`} 
            onClick={() => handleSelection(false)} 
            disabled={status !== 'idle'}
          >
            <span style={{fontSize:'2rem'}}>👎</span> False
          </button>
        </div>
      </div>

      <FeedbackFooter 
        status={status}
        correctAnswer={questions[current].answer ? "True" : "False"}
        onCheck={() => {}}
        onNext={handleContinue}
        disabledCheck={selected === null}
      />
    </>
  );
};
export default PracticeTF;