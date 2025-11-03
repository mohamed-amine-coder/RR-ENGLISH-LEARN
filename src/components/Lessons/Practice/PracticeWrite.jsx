import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "./Practice.module.css";

const PracticeWrite = ({ questions, onNext, onAnswer }) => {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");

  const handleNext = () => {
    if (input.trim().toLowerCase() === questions[current].answer.toLowerCase()) {
      onAnswer();
    }
    setInput("");
    if (current + 1 < questions.length) setCurrent(current + 1);
    else onNext();
  };
  

  return (
    <div className={styles.write}>
      <p className={styles.fadeSlide}>{questions[current].question}</p>
      <input
        type="text"
        className={styles.inputField}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className={styles.nextBtn} onClick={handleNext}>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default PracticeWrite;
