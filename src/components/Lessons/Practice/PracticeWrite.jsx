import React, { useState, useRef, useEffect } from "react";
import { FaCheck, FaTimes, FaLightbulb } from "react-icons/fa";
import styles from "./Practice.module.css";

const PracticeWrite = ({ questions, onNext, onAnswer }) => {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle, correct, wrong
  const [isShaking, setIsShaking] = useState(false); // للتحكم في الأنيميشن
  const [showHint, setShowHint] = useState(false); // لإظهار التلميح
  
  const inputRef = useRef(null);

  // دالة تنظيف النص (باش ما نحكروش على المسافات والنقط)
  const cleanText = (text) => {
    return text.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
  };

  const handleCheck = () => {
    if (!input.trim()) return;

    const userAnswer = cleanText(input);
    const correctAnswer = cleanText(questions[current].answer);

    if (userAnswer === correctAnswer) {
      setStatus("correct");
      onAnswer();
    } else {
      setStatus("wrong");
      // تفعيل الهزة
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500); // حبس الهزة بعد نصف ثانية
    }
  };

  const handleContinue = () => {
    setInput("");
    setStatus("idle");
    setShowHint(false);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      onNext();
    }
    // إعادة التركيز على الكتابة أوتوماتيكياً
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // التعامل مع زر Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (status === 'idle' && input.trim()) {
        handleCheck();
      } else if (status !== 'idle') {
        handleContinue();
      }
    }
  };

  // التركيز التلقائي عند بداية كل سؤال
  useEffect(() => {
    inputRef.current?.focus();
  }, [current]);

  return (
    <>
      <div className={styles.cardBody}>
        <div className={styles.instructionTitle}>اكتب الترجمة الإنجليزية</div>
        
        {/* السؤال بخط كبير */}
        <h2 className={styles.questionText} style={{marginBottom: '40px'}}>
          {questions[current].question}
        </h2>
        
        <div style={{width: '100%', maxWidth: '500px'}}>
          <input
            ref={inputRef}
            type="text"
            className={`${styles.writeInput} ${isShaking ? styles.shake : ''}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type here... and click enter"
            disabled={status !== "idle"}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            dir="ltr" // الكتابة ديما من اليسار
          />
          
          {/* زر تلميح يظهر إذا حصل المستخدم */}
          {status === 'idle' && !showHint && (
            <button 
              className={styles.hintButton} 
              onClick={() => setShowHint(true)}
            >
              <FaLightbulb /> محتاج مساعدة؟
            </button>
          )}

          {/* التلميح: يظهر الحرف الأول وعدد الحروف */}
          {showHint && status === 'idle' && (
            <p style={{color: '#888', fontSize: '0.9rem', marginTop: '10px', direction: 'ltr'}}>
              Hint: Starts with <strong>"{questions[current].answer[0]}"</strong> ({questions[current].answer.length} letters)
            </p>
          )}
        </div>
      </div>

      <div className={`${styles.footerArea} ${status !== 'idle' ? styles[status] : ''}`} style={{display: status === 'idle' ? 'none' : 'flex'}}>
        <div className={styles.footerContent}>
          <div className={styles.feedbackMessage}>
            <div className={styles.feedbackIcon} style={{color: status === 'correct' ? '#58a700' : '#ea2b2b'}}>
              {status === 'correct' ? <FaCheck /> : <FaTimes />}
            </div>
            <div className={styles.feedbackText}>
              <h3>{status === 'correct' ? 'جواب صحيح!' : 'الحل الصحيح:'}</h3>
              {/* في حالة الخطأ، نظهر الجواب الصحيح بوضوح */}
              {status === 'wrong' && (
                <p style={{margin:0, fontWeight:'bold', fontSize: '1.1rem', direction: 'ltr'}}>
                  {questions[current].answer}
                </p>
              )}
            </div>
          </div>

          <button 
            className={`${styles.actionButton} ${status === 'wrong' ? styles.wrongState : ''}`} 
            onClick={handleContinue}
            // إضافة ref للزر باش نقدرو نتحكمو فيه إلا بغينا، لكن Enter كايف بالغرض
          >
            تابع
          </button>
        </div>
      </div>
    </>
  );
};

export default PracticeWrite;