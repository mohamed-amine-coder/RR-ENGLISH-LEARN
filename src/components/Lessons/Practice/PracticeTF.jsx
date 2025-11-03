import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "./Practice.module.css";

const PracticeTF = ({ questions, onNext, onAnswer }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null); // true/false بعد الاختيار
  const [feedback, setFeedback] = useState("");

  const handleSelect = (value) => {
    if (selected !== null) return; // منع تغيير الاختيار بعد الضغط
    setSelected(value);

    if (value === questions[current].answer) {
      setFeedback("صح");
      onAnswer();
    } else {
      setFeedback("غلط");
    }
  };

  const handleNext = () => {
    setSelected(null);
    setFeedback("");
    if (current + 1 < questions.length) setCurrent(current + 1);
    else onNext();
  };

  return (
    <div className={styles.tf}>
      <p className={styles.fadeSlide}>{questions[current].question}</p>
      <div className={styles.tfButtons}>
        <button
          onClick={() => handleSelect(true)}
          className={
            selected === true && feedback === "صح"
              ? styles.optionBtnCorrect
              : selected === true && feedback === "غلط"
              ? styles.optionBtnWrong
              : ""
          }
        >
          صح
        </button>
        <button
          onClick={() => handleSelect(false)}
          className={
            selected === false && feedback === "صح"
              ? styles.optionBtnCorrect
              : selected === false && feedback === "غلط"
              ? styles.optionBtnWrong
              : ""
          }
        >
          خطأ
        </button>
      </div>

      {feedback && <p className={styles.feedback}>{feedback}</p>}

      {selected !== null && (
        <button className={styles.nextBtn} onClick={handleNext}>
          التالي <FaArrowRight />
        </button>
      )}
    </div>
  );
};

export default PracticeTF;
