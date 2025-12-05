import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import styles from "./Practice.module.css";

const PracticeQuiz = ({ questions, onNext, onAnswer }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState("idle"); // idle, correct, wrong

  // دمجنا الاختيار مع التحقق في دالة واحدة
  const handleSelect = (opt) => {
    if (status !== "idle") return; // منع التغيير إذا تم التحقق مسبقاً

    setSelected(opt);
    
    // التحقق الفوري
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
          {questions[current].options.map((opt) => (
            <div
              key={opt}
              // تغيير الستايل مباشرة عند النقر
              className={`${styles.optionCard} ${selected === opt ? styles.selected : ''} ${status !== 'idle' && opt === questions[current].answer ? styles.correct : ''} ${status === 'wrong' && selected === opt ? styles.wrong : ''}`}
              onClick={() => handleSelect(opt)} // التحقق الفوري هنا
            >
              {opt}
            </div>
          ))}
        </div>
      </div>

      {/* الفوتر يظهر فقط بعد الإجابة */}
      <div className={`${styles.footerArea} ${status !== 'idle' ? styles[status] : ''}`} style={{display: status === 'idle' ? 'none' : 'flex'}}>
        <div className={styles.footerContent}>
          
          <div className={styles.feedbackMessage}>
            <div className={styles.feedbackIcon} style={{color: status === 'correct' ? '#58a700' : '#ea2b2b'}}>
              {status === 'correct' ? <FaCheck /> : <FaTimes />}
            </div>
            <div className={styles.feedbackText}>
              <h3>{status === 'correct' ? 'ممتاز!' : 'إجابة خاطئة'}</h3>
              {status === 'wrong' && <p style={{margin:0, fontSize:'0.9rem'}}>الإجابة الصحيحة: {questions[current].answer}</p>}
            </div>
          </div>
          
          {/* زر واحد فقط: تابع */}
          <button 
            className={`${styles.actionButton} ${status === 'wrong' ? styles.wrongState : ''}`} 
            onClick={handleContinue}
          >
            تابع
          </button>

        </div>
      </div>
    </>
  );
};

export default PracticeQuiz;