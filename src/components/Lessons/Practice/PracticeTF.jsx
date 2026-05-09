// Practice/PracticeTF.jsx
import React, { useState } from "react";
import styles from "./Practice.module.css";
import FeedbackFooter from "./FeedbackFooter";

const PracticeTF = ({ questions, onNext, onAnswer }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle");

  const handleCheck = () => {
    if (selected === null || status !== "idle") return; 
    const isCorrect = selected === questions[current].answer;
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
          <button 
            className={`${styles.tfBtn} ${selected === true ? styles.selected : ''} ${status !== 'idle' && questions[current].answer === true ? styles.correct : ''} ${status === 'wrong' && selected === true ? styles.wrong : ''}`} 
            onClick={() => {if(status === 'idle') setSelected(true)}} 
            disabled={status !== 'idle'}
          >
            <span style={{fontSize:'2rem'}}>👍</span> True
          </button>
          <button 
            className={`${styles.tfBtn} ${selected === false ? styles.selected : ''} ${status !== 'idle' && questions[current].answer === false ? styles.correct : ''} ${status === 'wrong' && selected === false ? styles.wrong : ''}`} 
            onClick={() => {if(status === 'idle') setSelected(false)}} 
            disabled={status !== 'idle'}
          >
            <span style={{fontSize:'2rem'}}>👎</span> False
          </button>
        </div>
      </div>

      <FeedbackFooter 
        status={status}
        correctAnswer={questions[current].answer ? "True" : "False"}
        onCheck={handleCheck}
        onNext={handleContinue}
        disabledCheck={selected === null}
      />
    </>
  );
};
export default PracticeTF;