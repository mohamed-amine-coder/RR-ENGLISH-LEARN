import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "./Practice.module.css";

const PracticeQuiz = ({ questions, onNext, onAnswer }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");

  const handleSelect = (opt) => {
    if (selected) return; // منع التغيير بعد الاختيار
    setSelected(opt);

    if (opt === questions[current].answer) {
      onAnswer(); // زيادة النتيجة
    }
  };

  const handleNext = () => {
    setSelected("");
    if (current + 1 < questions.length) setCurrent(current + 1);
    else onNext();
  };

  return (
    <div className={styles.quiz}>
      <p className={styles.fadeSlide}>{questions[current].question}</p>
      <div className={styles.options}>
        {questions[current].options.map((opt) => {
          const isSelected = selected === opt;
          const isCorrect = opt === questions[current].answer;
          let btnClass = styles.optionBtn;

          // تلوين الزر حسب الاختيار
          if (isSelected && isCorrect) btnClass += ` ${styles.optionBtnCorrect}`;
          if (isSelected && !isCorrect) btnClass += ` ${styles.optionBtnWrong}`;

          return (
            <button
              key={opt}
              className={btnClass}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected && (
        <button className={styles.nextBtn} onClick={handleNext}>
          التالي <FaArrowRight />
        </button>
      )}
    </div>
  );
};

export default PracticeQuiz;
